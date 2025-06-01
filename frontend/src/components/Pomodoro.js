import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";  // useNavigate 추가
import Character from "./Character";
import PomodoroFeedback from "./PomodoroFeedback";  // 환경 피드백 컴포넌트
import MediaPipeCapture from "./MediaPipeCapture";  // MediaPipe 웹캠 컴포넌트
import { extractFeatures } from "../utils/FeatureExtraction"; // 특징 추출 함수
import { classifyState } from "../utils/Classifier";          // 상태 분류기
import axios from 'axios';  // 아두이노 데이터 받아오기 위한 axios

const PomodoroTimer = () => {
  const location = useLocation();
  const navigate = useNavigate();  // useNavigate 추가
  const duration = Number(location.state?.duration) || 25; // 분 단위, 기본 25분
  const [timeLeft, setTimeLeft] = useState(duration * 60); // 초 단위
  const [isActive, setIsActive] = useState(false);

  // 아두이노 센서 데이터 상태
  const [sensorData, setSensorData] = useState({
    temp: 0,
    humi: 0,
    light: 0,
    sound: 0,
  });

  // MediaPipe에서 받은 결과 저장용
  const [mediaPipeData, setMediaPipeData] = useState({ pose: null, face: null });
  // 분류된 집중 상태 문자열
  const [state, setState] = useState("측정 중...");

  // 집중도 점수 (100점에서 차감되는 형태)
  const [focusLevel, setFocusLevel] = useState(100);  // 기본 100점

  // MediaPipe 결과 콜백
  const handleResults = useCallback(({ pose, face }) => {
    setMediaPipeData({ pose, face });
  }, []);

  // 특징 추출 및 상태 분류
  useEffect(() => {
    const features = extractFeatures(mediaPipeData.pose, mediaPipeData.face);
    const classified = classifyState(features);
    setState(classified);
  }, [mediaPipeData]);

  // 점수 차감 로직 (집중 상태가 아닐 때 점수 차감)
  useEffect(() => {
    if (!isActive) return;  // 타이머가 시작되면 점수 차감 시작

    if (timeLeft <= 0) {
      setIsActive(false);
      // 타이머 종료 후 결과 페이지로 이동
      navigate("/result", { state: { focusLevel } });  // 집중도 점수 전달
      return;
    }

    

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [isActive, timeLeft, navigate, state, focusLevel]);  // `navigate`, `state`, `focusLevel` 추가

  // 아두이노 센서 데이터 주기적으로 받아오기
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/state");
        setSensorData(res.data);  // 받아온 센서 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching sensor data", error);
      }
    }, 2000);  // 2초마다 데이터 갱신

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 종료
  }, []);

  // 피드백 메시지 생성 (환경 피드백)
  const getEnvironmentFeedback = () => {
    const { temp, humi, light, sound } = sensorData;
    const messages = [];

    // 환경에 따른 피드백 메시지 생성
    if (temp < 20) {
      messages.push("🌡 온도가 낮아요. 따뜻하게 하세요.");
    } else if (temp > 28) {
      messages.push("🌡 온도가 높아요. 선풍기를 켜보세요.");
    }
    if (humi < 35) {
      messages.push("💧 습도가 낮아요. 가습기를 써보세요.");
    } else if (humi > 70) {
      messages.push("💧 습도가 높아요. 환기하세요.");
    }
    if (light < 300) {
      messages.push("💡 조명이 어두워요. 불을 켜보세요.");
    }
    if (sound > 500) {
      messages.push("🔈 주변이 시끄러워요. 조용한 장소 추천!");
    }

    if (messages.length === 0) {
      messages.push("환경이 좋아요! 집중하기 좋은 상태입니다. 😊");
    }

    return messages;
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        position: 'relative',
      }}
    >
      {/* 타이머 표시 */}
      <div style={{ fontSize: "48px", marginBottom: "20px" }}>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>

       {/* 집중도에 따른 캐릭터 */}
       <div
        style={{
          display: 'flex',
          flexDirection: 'row', // 가로 배치
          alignItems: 'center',  // 세로 가운데 정렬
          justifyContent: 'center',
          gap: '20px',           // 캐릭터와 피드백 사이 간격
          height: '100vh',
        }}
      >
        <Character focusLevel={focusLevel} />

        <PomodoroFeedback
          feedbackMessages={getEnvironmentFeedback()}
          style={{ maxWidth: '400px' }}
        />
      </div>

      {/* 웹캠 (타이머 시작 시에만 실행) */}
      {isActive && <MediaPipeCapture onResults={handleResults} />}

      {/* 집중 시작/일시정지 버튼 */}
      <button
        onClick={() => setIsActive((prev) => !prev)}
        style={{
          marginTop: "20px",
          padding: "10px 30px",
          fontSize: "18px",
          cursor: "pointer",
          backgroundColor: isActive ? "#ff6f61" : "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {isActive ? "일시 정지" : "집중 시작"}
      </button>

      {/* 현재 상태 표시 */}
      <div style={{ marginTop: 10, fontSize: 20 }}>{state}</div>
    </div>
  );
};

export default PomodoroTimer;

import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Character from "./Character";
import Feedback from "./FeedBack";
import MediaPipeCapture from "./MediaPipeCapture";  // 미디어파이프 웹캠 컴포넌트
import { extractFeatures } from "../utils/FeatureExtraction"; // 특징 추출 함수
import { classifyState } from "../utils/Classifier";          // 상태 분류기

const PomodoroTimer = () => {
  const location = useLocation();
  const duration = Number(location.state?.duration) || 25; // 분 단위, 기본 25분
  const [timeLeft, setTimeLeft] = useState(duration * 60); // 초 단위
  const [isActive, setIsActive] = useState(false);

  // MediaPipe에서 받은 결과 저장용
  const [mediaPipeData, setMediaPipeData] = useState({ pose: null, face: null });
  // 분류된 집중 상태 문자열
  const [state, setState] = useState("측정 중...");

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

  // 집중도 점수 계산 (예시: "집중 상태"일 때 80, 그 외는 20)
  const focusLevel = state === "집중 상태" ? 80 : 20;

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      setIsActive(false);
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [isActive, timeLeft]);

  // 집중도 기반 피드백 메시지
  const getFeedbackMessages = () => {
    if (!isActive) return ["타이머를 시작하세요!"];
    if (focusLevel > 50) return ["집중 잘 하고 있어요!"];
    if (focusLevel < 50) return ["조금만 더 집중해봐요!"];
    return ["집중이 필요해요!"];
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        position: "relative",
      }}
    >
      {/* 웹캠 (타이머 시작 시에만 실행) */}
      {isActive && <MediaPipeCapture onResults={handleResults} />}
      {/* 타이머 표시 */}
      <div style={{ fontSize: "48px", marginBottom: "20px" }}>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>

      {/* 집중도에 따른 캐릭터 */}
      <Character focusLevel={focusLevel} />

      

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

      {/* 피드백 메시지 */}
      <Feedback feedbackMessages={getFeedbackMessages()} textAlign="center" />

      {/* 현재 상태 표시 */}
      <div style={{ marginTop: 10, fontSize: 20 }}>{state}</div>
    </div>
  );
};

export default PomodoroTimer;

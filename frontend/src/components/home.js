import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate 훅 사용
import TimerButton from './TimerButton';  // 타이머 버튼 컴포넌트
import Feedback from './FeedBack';      // 피드백 컴포넌트
import Character from './Character';   // 다마고치 캐릭터 컴포넌트

const Home = () => {
  const [sessionStarted, setSessionStarted] = useState(false);
  const navigate = useNavigate();  // useNavigate 훅 사용

  // 컴포넌트가 렌더링된 후에 한 번만 실행할 작업
  useEffect(() => {
    console.log("홈 화면이 렌더링되었습니다.");
  }, []);  // 빈 배열을 넣어주면 컴포넌트가 처음 렌더링될 때만 실행됩니다.

  // 새로운 세션을 시작할 때 호출되는 함수
  const handleNewSession = () => {
    setSessionStarted(true);
    navigate('/timer'); // 타이머 화면으로 이동 (navigate()로 변경)
  };

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
      {/* 다마고치 캐릭터 중앙 배치 */}
      <Character />
      {/* 타이머 버튼 우측 하단 배치 */}
      <div
        style={{
          position: 'absolute',
          bottom: '500px', // 하단에 위치

        }}
      >
        
      </div>
      <Feedback/>
      <TimerButton onClick={handleNewSession} label="타이머 시작" />
      
      
    </div>
  );
};

export default Home;

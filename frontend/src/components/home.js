import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TimerButton from './components/TimerButton';  // 타이머 버튼 컴포넌트
import Feedback from './components/FeedBack';      // 피드백 컴포넌트
import Character from './components/Character';   // 다마고치 캐릭터 컴포넌트

const Home = () => {
  const [sessionStarted, setSessionStarted] = useState(false);
  const history = useHistory();

  // 새로운 세션을 시작할 때 호출되는 함수
  const handleNewSession = () => {
    setSessionStarted(true);
    history.push('/timer'); // 타이머 화면으로 이동
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
          bottom: '20px', // 하단에 위치
          right: '20px',  // 오른쪽에 위치
        }}
      >
        <TimerButton onClick={handleNewSession} label="타이머 시작" />
      </div>
    </div>
  );
};

export default Home;

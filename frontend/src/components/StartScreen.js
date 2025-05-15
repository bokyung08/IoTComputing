import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate 훅 사용
import axios from 'axios';
import Feedback from './FeedBack';  // 피드백 컴포넌트
import Button from './startButton';  // 타이머 버튼 컴포넌트
import Character from './Character';  // 다마고치 캐릭터 컴포넌트

function StartScreen() {
  const [sensor, setSensor] = useState({});
  const navigate = useNavigate();  // useNavigate 훅 사용

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await axios.get('http://localhost:3001/api/state');
      console.log(res.data);
      setSensor(res.data);
    }, 2000);

    return () => clearInterval(interval);  // 컴포넌트 언마운트 시 interval 정리
  }, []);

  const handleResumeSession = () => {
    navigate('/home');  // 이어하기 버튼 클릭 시 홈 화면으로 이동
  };

  const handleNewSession = () => {
    navigate('/timer');  // 새로 시작 버튼 클릭 시 타이머 화면으로 이동
  };

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        position: 'relative',
      }}>
      <h2>안경만두와 집중해보세요</h2>
      <Character /> {/* 예시로 focusLevel을 80으로 설정 */}

      {/* 버튼을 좌우로 배치 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '60%', marginTop: '20px' }}>
        <Button onNewSession={handleNewSession} onResumeSession={handleResumeSession} />
      </div>

      {/* 피드백 */}
      <Feedback feedbackMessages={["집중 좀 해."]} />
    </div>
  );
}

export default StartScreen;

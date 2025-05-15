import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';  // useNavigate로 변경
import axios from 'axios';
import Feedback from './components/FeedBack';
import Button from './components/startButton';
import Character from './components/Character';
import Home from './components/Home';  // Home 컴포넌트는 대문자로 수정

function StartScreen() {
  const [sensor, setSensor] = useState({});
  const navigate = useNavigate();  // useNavigate로 변경

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await axios.get('http://localhost:3001/api/state');
      console.log(res.data);
      setSensor(res.data);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleResumeSession = () => {
    navigate('/home');  // 화면을 /home으로 이동
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h2>안경만두와 집중해보세요</h2>
      <Character focusLevel={80} /> {/* 예시로 focusLevel을 80으로 설정 */}

      {/* 버튼을 좌우로 배치 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '60%', marginTop: '20px' }}>
        <Button onNewSession={() => alert('새로 시작')} onResumeSession={handleResumeSession} />
      </div>

      {/* 피드백 */}
      <Feedback feedbackMessages={["집중 좀 해."]} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* "/" 경로에 StartScreen 컴포넌트가 렌더링 */}
        <Route path="/" element={<StartScreen />} />
        {/* "/home" 경로에 Home 컴포넌트가 렌더링 */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

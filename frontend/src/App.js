import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Feedback from './components/FeedBack';   
import Button from './components/startButton';
import Character from './components/Character';
import home from './components/home';

function App() {
  const [sensor, setSensor] = useState({});
  const histroy = useHistory();

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await axios.get('http://localhost:3001/api/state');
      console.log(res.data);
      setSensor(res.data);
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  const handleResumeSession = () => {
    histroy.push('/home');
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h2>안경만두와 집중해보세요</h2>
      <Character focusLevel={80} /> {/* 예시로 focusLevel을 80으로 설정 */}
      
      {/* 버튼을 좌우로 배치 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '60%', marginTop: '20px' }}>
        <Button onNewSession={() => alert('새로 시작')} onResumeSession={handleResumeSession}/>
      </div>
      
      {/* 피드백 */}
      <Feedback feedbackMessages={["집중 좀 해."]} />
    </div>
  );
}
function App(){
  return (
  <Router>
    <Switch>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<home />} />
    </Switch>
  </Router>
  );
}

export default App;

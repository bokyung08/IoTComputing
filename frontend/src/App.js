import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // React Router v6
import StartScreen from './components/StartScreen';
import Home from './components/home';
import PomodoroTimer from './components/Pomodoro';
import Timer from './components/Timer';

function App() {
  const [sensor, setSensor] = useState({});

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch('http://localhost:3001/api/state').then(r => r.json());
      console.log(res);
      setSensor(res);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pomodoro" element={<PomodoroTimer />} />
        <Route path="/timer" element={<Timer />} />
      </Routes>
    </Router>
  );
}

export default App;

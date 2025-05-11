import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [sensor, setSensor] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:3001/api/state');
      setSensor(res.data);
    };
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
    <h2>센서 데이터</h2>
    <p>온도: {sensor.temp} °C</p>
    <p>습도: {sensor.humi} %</p>
    <p>조도: {sensor.light}</p>
    <p>소음: {sensor.sound}</p>
  
    <h3>환경 피드백</h3>
    {sensor.feedback?.length > 0 ? (
      <ul>
        {sensor.feedback.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    ) : (
      <p>좋은 환경이에요! 계속 집중해보세요 💪</p>
    )}
  </div>
  
  );
}

export default App;

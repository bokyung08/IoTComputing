import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [sensor, setSensor] = useState({});

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await axios.get('http://localhost:3001/api/state');
      console.log(res.data);
      setSensor(res.data);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>센서 데이터</h2>
      <p>온도: {sensor.temp}</p>
      <p>습도: {sensor.humi}</p>
      <p>조도: {sensor.light}</p>
      <p>소리: {sensor.sound}</p>
    </div>
  );
}

export default App;

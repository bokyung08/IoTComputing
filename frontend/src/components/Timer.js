import React, {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // 아두이노 데이터 받아오기 위한 axios


const Timer = () => {
  const [time, setTime] = useState('');
  const [arduinoTime, setArduinoTime] = useState('');  // 아두이노로부터 받은 시간
  const [keypadInput, setKeypadInput] = useState('');  // 아두이노 키패드 입력
  const navigate = useNavigate();

  // 아두이노로부터 실시간 데이터 받아오기
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // 아두이노에서 센서 및 키패드 데이터 받기
        const sensorRes = await axios.get('http://localhost:3001/api/sensor'); // 센서 데이터
        const keypadRes = await axios.get('http://localhost:3001/api/keypad'); // 키패드 데이터
        
        setKeypadInput(keypadRes.data.input);  // 아두이노로부터 받은 키패드 값 설정
        // sensorData로 타이머 값 설정 (필요시)
        setArduinoTime(sensorRes.data.temp);  // 예시로 온도 데이터를 사용
        
      } catch (error) {
        console.error("Error fetching Arduino data", error);
      }
    }, 2000);  // 2초마다 데이터 갱신

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 종료
  }, []);

  const handleChange = (e) => {
    setTime(e.target.value);
  };

  const handleStart = () => {
    // /pomodoro 경로로 이동 (시간 정보 전달)
    navigate('/pomodoro', { state: { duration: time || arduinoTime || keypadInput } });  // 아두이노에서 받은 값으로 타이머 설정
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
      <h2>타이머 설정해주세요(0~200 분 사이)</h2>
      <img src="/character/neutral.png" alt="Character" style={{ width: '150px', height: '150px' }} />
      <br />
      <br />
      <br />
      <input
        type="number"
        min="1"
        max="200"
        placeholder="분 단위 입력"
        value={time}
        onChange={handleChange}
        style={{ fontSize: '18px', padding: '8px', width: '150px' }}
      />
      <div style={{ margin: '20px 0', fontSize: '20px' }}>
        설정된 시간: {time ? `${time} 분` : arduinoTime ? `${arduinoTime} 분` : keypadInput ? `${keypadInput} 분` : '-'}
      </div>
      <button
        onClick={handleStart}
        style={{
          padding: '10px 30px',
          fontSize: '18px',
          cursor: 'pointer',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
        disabled={!time && !arduinoTime && !keypadInput}  // 아두이노 데이터가 없으면 버튼 비활성화
      >
        집중 시작하기
      </button>
    </div>
  );
};

export default Timer;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // 추가

const Timer = () => {
  const [time, setTime] = useState('');
  const navigate = useNavigate();  // 추가

  const handleChange = (e) => {
    setTime(e.target.value);
  };

  const handleStart = () => {
    // /pomodoro 경로로 이동 (원한다면 시간 정보 전달 가능)
    navigate('/pomodoro', { state: { duration: time } });
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
        설정된 시간: {time ? `${time} 분` : '-'}
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
        disabled={!time}
      >
        집중 시작하기
      </button>
    </div>
  );
};

export default Timer;

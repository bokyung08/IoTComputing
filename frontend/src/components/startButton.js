import React from 'react';

const Button = ({ onNewSession, onResumeSession }) => {
  return (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      {/* 새로 하기 버튼 */}
      <button
        onClick={onNewSession}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745', // 초록색
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginRight: '10px',
        }}
      >
        새로 하기
      </button>

      {/* 이어 하기 버튼 */}
      <button
        onClick={onResumeSession}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff', // 파란색
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        이어 하기
      </button>
    </div>
  );
};

export default Button;

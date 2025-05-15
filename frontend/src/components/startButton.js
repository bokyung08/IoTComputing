import React from 'react';

const Button = ({ onNewSession, onResumeSession }) => {
  return (
    <div
      style={{
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '40px',
      }}
    >
      <button
        onClick={onNewSession}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        새로 하기
      </button>

      <button
        onClick={onResumeSession}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
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

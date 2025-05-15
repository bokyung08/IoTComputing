import React from 'react';

const TimerButton = ({ onClick, label, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}  // 버튼이 비활성화될 수 있도록
      aria-label={label}  // 접근성 고려하여 aria-label 추가
      style={{
        padding: '10px 20px',
        backgroundColor: disabled ? '#aaa' : '#007bff', // 비활성화된 경우 회색
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: disabled ? 'not-allowed' : 'pointer', // 비활성화 상태일 때 커서 변경
      }}
    >
      {label}
    </button>
  );
};

export default TimerButton;

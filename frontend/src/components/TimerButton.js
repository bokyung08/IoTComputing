import React from 'react';

const TimerButton = ({ onClick, label, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}  // 버튼이 비활성화될 수 있도록
      aria-label={label}  // 접근성 고려하여 aria-label 추가
      style={{
        position: 'absolute',  // 버튼을 절대 위치로 설정
        bottom: '150px',  // 화면 하단에서 20px 위로 버튼 위치
        left: '50%',  // 화면 가로 중앙에 위치
        transform: 'translateX(-50%)',  // 정확한 가운데 정렬
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

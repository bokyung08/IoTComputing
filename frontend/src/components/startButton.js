import React from 'react';

const Button = ({ onNewSession, onResumeSession }) => {
  return (
    <div>
      <button
        onClick={onResumeSession}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          position: 'absolute',
          bottom: '150px',  // 하단에서 150px 위에 위치
          left: '50%',      // 화면 가로 중앙
          transform: 'translateX(-50%)', // 정확히 가운데 정렬
        }}
      >
        이어 하기
      </button>
    </div>
  );
};

export default Button;

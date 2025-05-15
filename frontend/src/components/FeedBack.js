import React from 'react';

const Feedback = ({ feedbackMessages }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '300px',         // 화면 하단 약간 위로 띄우기
        left: '50%',            // 좌우 중앙 정렬
        transform: 'translateX(-50%)', // 정확한 가운데 정렬
        maxWidth: '400px',      // 최대 너비 제한
        backgroundColor: '#333', // 어두운 배경 (말풍선 느낌)
        color: 'white',
        padding: '15px 20px',
        borderRadius: '20px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        fontSize: '16px',
        zIndex: 1000,
        textAlign: 'center',
      }}
    >
      {feedbackMessages.map((msg, idx) => (
        <p key={idx} style={{ margin: '5px 0' }}>
          {msg}
        </p>
      ))}

    </div>
  );
};

export default Feedback;

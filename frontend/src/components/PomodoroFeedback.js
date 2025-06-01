import React from 'react';

// 환경 피드백 컴포넌트
const PomodoroFeedback = ({ feedbackMessages }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: '75%',
        transform: 'translateX(-50%)',
        maxWidth: '400px',
        backgroundColor: '#f1c40f',  // 노란색 배경
        color: 'black',
        padding: '15px 20px',
        borderRadius: '20px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        fontSize: '16px',
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

export default PomodoroFeedback;

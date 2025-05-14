import React from 'react';

// Feedback 컴포넌트: 환경에 대한 피드백을 보여주는 컴포넌트
const Feedback = ({ feedbackMessages }) => {
  return (
    <div style={{
      position: 'fixed',
      bottom: '0',
      width: '100%',
      backgroundColor: '#f1f1f1',
      padding: '15px',
      textAlign: 'center',
      fontSize: '16px',
      borderTop: '1px solid #ddd',
    }}>
      <h3>Feedback</h3>
      <ul>
        {feedbackMessages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default Feedback;

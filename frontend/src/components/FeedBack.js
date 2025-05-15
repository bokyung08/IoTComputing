import React, { useEffect, useState } from 'react';

// Feedback 컴포넌트: 환경에 대한 피드백을 보여주는 컴포넌트
const Feedback = ({ feedbackMessages }) => {
  const [messages, setMessages] = useState(feedbackMessages); // 피드백 메시지 상태

  // 피드백 메시지가 변경되면 console에 출력
  useEffect(() => {
    console.log("피드백 메시지가 변경되었습니다:", messages);
  }, [messages]); // messages가 변경될 때마다 실행

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
        {messages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default Feedback;

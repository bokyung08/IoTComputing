import React from 'react';

const Feedback = ({ feedbackMessages }) => {
  return (
        <div
          style={{
            // position: 'fixed',  // 이 부분 제거 또는 변경
            // bottom: '50px',
            // left: '50%',
            // transform: 'translateX(-50%)',
            // zIndex: 1000,
            maxWidth: "400px",
            backgroundColor: "#333",
            color: "white",
            padding: "15px 20px",
            borderRadius: "20px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            fontSize: "16px",
            textAlign: "left", // 옆에 뜰 때는 왼쪽 정렬 추천
          }}
        >
          {feedbackMessages.map((msg, idx) => (
            <p key={idx} style={{ margin: "5px 0" }}>
              {msg}
            </p>
          ))}
        </div>
      );
    };
    

export default Feedback;
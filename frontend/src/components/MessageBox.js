import React, { useState, useEffect } from 'react';

const MessageBox = ({ message, isActive, duration = 3000 }) => {
  const [visible, setVisible] = useState(isActive);

  // 메시지가 활성화되면 일정 시간 후 사라지게 하기
  useEffect(() => {
    if (isActive) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false); // duration 후 메시지 사라짐
      }, duration);

      return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 정리
    }
  }, [isActive, duration]);

  // isActive가 false일 경우 메시지 박스를 렌더링하지 않음
  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#f1c40f',
        padding: '10px 20px',
        borderRadius: '5px',
        color: 'white',
        fontSize: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        opacity: visible ? 1 : 0, // 애니메이션 효과
        transition: 'opacity 0.5s ease-out',
      }}
    >
      {message}
    </div>
  );
};

export default MessageBox;

import React, { useState, useEffect } from 'react';

const Feedback = ({ feedbackMessages }) => {
  const [currentMessage, setCurrentMessage] = useState("집중해볼까요?");  // 초기 메시지 상태

  // 피드백 메시지 배열 (MZ세대 스타일로 할일을 독려하는 말)
  const messages = [
    "⏰ 이제 시작해야죠! 계속 미루면 끝이 없어요!",
    "⚡ 다시 한 번 말할게요! 시작 안 하면 아무것도 안 바뀝니다.",
    "🚨 더 이상 기다리지 마세요. 지금 시작하지 않으면 후회할 거예요.",
    "⏳ 이젠 시작할 시간! 계속 미룬다면 결과는 뻔해요.",
    "👀 시간 낭비 그만하고 집중하세요. 시작하지 않으면 아무것도 변하지 않아요.",
    "🔥 계속해서 미루면 끝도 없어요. 지금 바로 시작해보세요!",
    "💥 뭐하고 있는 거예요? 빨리 시작하세요! 시간은 가고 있어요.",
    "🚨 이제 그만 미루고 시작하세요. 더 이상 핑계는 통하지 않아요!",
    "🔥 게으름 피우지 마세요! 시작하지 않으면 아무것도 달라지지 않아요.",
    "⏰ 집중을 미루지 말고 지금 시작해! 시간은 돌이킬 수 없어요.",
  ];

  // 랜덤 메시지 5초마다 변경
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setCurrentMessage(messages[randomIndex]);
    }, 5000); // 5초마다 메시지 업데이트

    // 처음 시작할 때 "집중해볼까요?" 메시지를 5초 후에 변경
    const timeout = setTimeout(() => {
      setCurrentMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 5000); // 5초 후 랜덤 메시지 변경

    return () => {
      clearInterval(interval);  // 컴포넌트 언마운트 시 interval 정리
      clearTimeout(timeout);    // 타이머 정리
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '50px', // 하단에서 약간 위로
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: '400px',
        backgroundColor: '#333',
        color: 'white',
        padding: '15px 20px',
        borderRadius: '20px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        fontSize: '16px',
        textAlign: 'center',
      }}
    >
      <p>{currentMessage}</p>  {/* 현재 랜덤 피드백 메시지 */}
    </div>
  );
};

export default Feedback;

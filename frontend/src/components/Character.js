import React, { useRef, useEffect, useState } from "react";

const Character = ({ focusLevel }) => {
  const [image, setImage] = useState("/character/neutral.png"); // 기본 이미지 설정
  const imageRef = useRef(null); // useRef로 이미지를 참조

  // focusLevel에 따라 이미지를 변경하는 함수
  const setCharacterImage = () => {
    if (focusLevel === undefined) {
      setImage("/character/neutral.png"); // 기본 이미지 (neutral)
    } else if (focusLevel >= 50) {
      setImage("/character/good.jpg"); // good 이미지
    } else {
      setImage("/character/bad.jpg"); // bad 이미지
    }
  };

  // 컴포넌트가 렌더링된 후 이미지 설정
  useEffect(() => {
    setCharacterImage(); // 렌더링된 후 이미지 설정
  }, [focusLevel]); // focusLevel이 변경될 때마다 이미지 업데이트

  useEffect(() => {
    if (imageRef.current) {
      console.log("Image is loaded: ", imageRef.current.src); // 이미지가 로드되었을 때
    }
  }, [image]); // 이미지 변경 후에 로그 출력

  return (
    <div className="character" style={{ textAlign: "center" }}>
      <img
        ref={imageRef}
        src={image}
        alt="Character"
        style={{ width: "150px", height: "150px" }}
      />
      <div className="character-text" style={{ marginTop: "10px" }}>
        {focusLevel === undefined
          ? ""
          : focusLevel >= 50
          ? "좋은 집중상태에요!"
          : "집중이 필요해요!"}
      </div>
    </div>
  );
};

export default Character;

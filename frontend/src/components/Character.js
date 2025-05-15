import React from "react";

const Character = ({ focusLevel }) => {
  // focusLevel이 없으면 neutral 이미지, 있으면 good/bad 이미지
  const CharacterImage = () => {
    // focusLevel이 없다면 기본 'neutral' 이미지 반환
    if (focusLevel === undefined) {
      return "/character/neutral.png"; // 기본 이미지 (neutral)
    }

    // focusLevel에 따른 이미지 반환
    if (focusLevel >= 50) {
      return "/character/good.jpg"; // good 이미지
    } else {
      return "/character/bad.jpg"; // bad 이미지
    }
  };

  return (
    <div className="character">
      <img src={CharacterImage()} alt="Character" />
      <div className="character-text">
        {focusLevel === undefined
          ? "집중 상태가 설정되지 않았어요."
          : focusLevel >= 50
          ? "좋은 집중상태에요!"
          : "집중이 필요해요!"}
      </div>
    </div>
  );
};
export default Character;

import React, {useState,useEffect} from "react"; //  useState는 상태 관리를 위해 사용되고, useEffect는 컴포넌트의 생명주기 관리에 사용됩니다.

const Character = ({focusLevel}) => {

    const CharacterImage =() => { // focusLevel이 50보다 작으면 나쁜 이미지, 아니면 좋은 이미지를 반환하는 함수
        if (focusLevel<50) {
            return "/character/bad.pn g";
        } else{
            return "/character/good.png";
        }
    };
    return (
        <div className="character"> // 위에서 정의한 CharacterImage 함수를 사용하여 이미지 경로를 설정합니다.
            <img src={CharacterImage()} alt="Character" />
            <div className="character-text">
                {focusLevel<50 ? "집중이 필요해요!" : "좋은 집중상태에요!"}
            </div>
        </div>
    );
}
export default Character; // Character 컴포넌트를 export하여 다른 파일에서 사용할 수 있도록 합니다.
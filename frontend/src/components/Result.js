import React from "react";
import { useLocation } from "react-router-dom";
import Character from "./Character";

const Result = () => {
  const location = useLocation();
  const { focusLevel } = location.state || {};

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        position: "relative",
      }}
    >
      <h2>집중도 평가</h2>
      {/* 집중도 점수에 따른 캐릭터 */}
      <Character focusLevel={focusLevel} />
      <div style={{ fontSize: "24px", marginTop: "20px" }}>
        집중도 점수: {focusLevel || 0}
      </div>
    </div>
  );
};

export default Result;

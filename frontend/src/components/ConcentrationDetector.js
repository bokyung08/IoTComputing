import React, { useState, useCallback } from "react";
import MediaPipeCapture from "./MediaPipeCapture";
import { extractFeatures } from "../utils/FeatureExtraction";
import { classifyState } from "../utils/Classifier";
import Character from "./Character";

const ConcentrationDetector = () => {
  const [state, setState] = useState("측정 중...");

  const handleResults = useCallback(({ pose, face }) => {
    const features = extractFeatures(pose, face);
    const classified = classifyState(features);
    setState(classified);
  }, []);
  return (
    <div>
      <MediaPipeCapture onResults={handleResults} />
      <h2>현재 상태: {state}</h2>
      <p>{getFeedbackMessage(state)}</p>
      <Character focusLevel={state === "집중 상태" ? 80 : 20} />
    </div>
  );
};

export default ConcentrationDetector;
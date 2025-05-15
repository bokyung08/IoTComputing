import React, { useRef, useEffect } from "react";
import { Pose } from "@mediapipe/pose";
import { FaceMesh } from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";

const MediaPipeCapture = ({ onResults }) => {
  const videoRef = useRef(null);
  const poseRef = useRef(null);
  const faceMeshRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    poseRef.current = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
    });
    poseRef.current.setOptions({ modelComplexity: 0, smoothLandmarks: true });
    poseRef.current.onResults(results => onResults(prev => ({ ...prev, pose: results })));

    faceMeshRef.current = new FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
    });
    faceMeshRef.current.setOptions({ maxNumFaces: 1, refineLandmarks: true });
    faceMeshRef.current.onResults(results => onResults(prev => ({ ...prev, face: results })));

    cameraRef.current = new cam.Camera(videoRef.current, {
      onFrame: async () => {
        await poseRef.current.send({ image: videoRef.current });
        await faceMeshRef.current.send({ image: videoRef.current });
      },
      width: 640,
      height: 480
    });
    cameraRef.current.start();

    return () => cameraRef.current?.stop();
  }, [onResults]);

  return <video ref={videoRef} style={{ display: "none" }} autoPlay muted />;
};

export default MediaPipeCapture;

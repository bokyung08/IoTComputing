export function extractFeatures(poseResults, faceResults) {
  if (!poseResults?.poseLandmarks || !faceResults?.multiFaceLandmarks?.[0]) return null;

  const landmarks = poseResults.poseLandmarks;
  const faceLandmarks = faceResults.multiFaceLandmarks[0];

  // 예: 상체 기울기 (간단 예시)
  const neck = landmarks[11];
  const hip = landmarks[23];
  const torsoVector = { x: hip.x - neck.x, y: hip.y - neck.y };
  const torsoAngle = Math.atan2(torsoVector.y, torsoVector.x) * (180 / Math.PI);
  const isLyingDown = Math.abs(torsoAngle) > 45;

  // 눈 감음 예: 눈 위, 아래 좌표 차이
  const leftEyeUpper = faceLandmarks[159];
  const leftEyeLower = faceLandmarks[145];
  const eyeOpenRatio = leftEyeLower.y - leftEyeUpper.y;
  const isEyeClosed = eyeOpenRatio < 0.01;

  return { isLyingDown, isEyeClosed };
}

// utils/FeatureExtraction.js

const EAR = (a, b, c, d, e, f) => {
  const dist = (p1, p2) => Math.hypot(p1.x - p2.x, p1.y - p2.y);
  return (dist(b, d) + dist(c, e)) / (2 * dist(a, f));
};

export const calcEAR = (landmarks, side = "left") => {
  const idx = side === "left"
    ? [33, 160, 158, 133, 153, 144]
    : [362, 385, 387, 263, 373, 380];
  return EAR(...idx.map(i => landmarks[i]));
};

export const calcHeadDown = (poseLandmarks) => {
  const nose = poseLandmarks[0];
  const leftShoulder = poseLandmarks[11];
  const rightShoulder = poseLandmarks[12];
  const shoulderY = (leftShoulder.y + rightShoulder.y) / 2;
  return nose.y - shoulderY;
};

export const extractFeatures = (poseResults, faceResults) => {
  const hasFace = faceResults?.multiFaceLandmarks?.length > 0;
  const hasPose = poseResults?.poseLandmarks?.length > 0;

  if (!hasFace && !hasPose) return { hasPerson: false };

  let ear = undefined;
  let headDown = 0;

  if (hasFace) {
    const landmarks = faceResults.multiFaceLandmarks[0];
    const left = calcEAR(landmarks, "left");
    const right = calcEAR(landmarks, "right");
    ear = (left + right) / 2;
  }

  if (hasPose) {
    headDown = calcHeadDown(poseResults.poseLandmarks);
  }

  return {
    hasPerson: true,
    ear,
    headDown,
  };
};
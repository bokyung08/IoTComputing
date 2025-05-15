export function classifyState(features) {
  if (!features) return "unknown";
  if (features.isLyingDown && features.isEyeClosed) return "졸음 상태";
  if (features.isEyeClosed) return "눈 감음 감지";
  if (features.isLyingDown) return "엎드림 감지";
  return "집중 상태";
}

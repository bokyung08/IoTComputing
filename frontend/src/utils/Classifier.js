export const classifyState = ({ hasPerson, ear, headDown }) => {
  if (!hasPerson) return "사람 없음";

  if (ear !== undefined && ear < 0.2) return "졸음 상태";
  if (headDown !== undefined && headDown > 0.15) return "엎드림";

  return "집중 상태";
};
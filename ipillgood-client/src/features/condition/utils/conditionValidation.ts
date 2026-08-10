export const validateConditionCheck = (
  vitalityScore: number,
  sleepHours: number,
  sleepMinutes: number,
) => {
  if (!Number.isInteger(vitalityScore) || vitalityScore < 1 || vitalityScore > 5) {
    throw new Error('활력 점수는 1~5 사이의 정수여야 합니다.');
  }
  if (!Number.isInteger(sleepHours) || sleepHours < 0 || sleepHours > 23) {
    throw new Error('수면 시간은 0~23 사이의 정수여야 합니다.');
  }
  if (!Number.isInteger(sleepMinutes) || sleepMinutes < 0 || sleepMinutes > 59) {
    throw new Error('수면 분은 0~59 사이의 정수여야 합니다.');
  }
};

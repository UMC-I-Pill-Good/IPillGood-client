export const getFirstDayOfWeek = (year: number, month: number): number => {
  return new Date(year, month - 1, 1).getDay();
};

export const getFirstDayOfWeek = (year: number, month: number): number => {
  return new Date(year, month - 1, 1).getDay();
};

export const isFutureDate = (date: string): boolean => {
  const now = new Date();
  const todayString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate(),
  ).padStart(2, '0')}`;

  return date > todayString;
};

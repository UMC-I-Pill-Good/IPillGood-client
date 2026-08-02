type DateParts = { year: number; month: number; day: number };

export const formatDateToISO = ({ year, month, day }: DateParts): string => {
  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
};

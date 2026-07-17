export type CalendarDayStatusType = 'DONE' | 'PARTIAL' | 'NONE';

export type CalendarDayType = {
  date: string;
  status: CalendarDayStatusType;
  takenCount: number;
  totalCount: number;
};

export type CalendarMonthType = {
  year: number;
  month: number;
  days: CalendarDayType[];
};

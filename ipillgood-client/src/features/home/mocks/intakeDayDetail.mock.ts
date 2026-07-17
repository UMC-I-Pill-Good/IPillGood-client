import type { DayIntakeDetailType } from '../types/intakeDayDetail.type';
import { mockIntakeCalendar } from './intakeCalendar.mock';
import { mockIntakeSupplementList } from './intakeSupplement.mock';

export const getMockIntakeDayDetail = (date: string): DayIntakeDetailType => {
  const day = mockIntakeCalendar.days.find((d) => d.date === date);
  const takenCount = day?.takenCount ?? 0;

  const intakes = mockIntakeSupplementList.map((supplement, index) => ({
    userSupplementId: supplement.userSupplementId,
    productName: supplement.productName,
    taken: index < takenCount,
    takenAt: index < takenCount ? `${date}T08:${String(10 + index).padStart(2, '0')}:00` : null,
  }));

  return { date, intakes };
};

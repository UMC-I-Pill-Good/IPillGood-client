import { useState } from 'react';
import { mockIntakeCalendar } from '../api/intakeCalendar.mock';
import { getMockIntakeDayDetail } from '../api/intakeDayDetail.mock';

export const useIntakeCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const selectedDayDetail = selectedDate ? getMockIntakeDayDetail(selectedDate) : null;

  return {
    year: mockIntakeCalendar.year,
    month: mockIntakeCalendar.month,
    days: mockIntakeCalendar.days,
    selectedDate,
    setSelectedDate,
    selectedDayDetail,
  };
};

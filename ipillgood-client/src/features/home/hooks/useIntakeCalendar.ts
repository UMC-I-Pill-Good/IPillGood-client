import { useState } from 'react';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { getIntakeCalendar } from '../api/intake';

export const useIntakeCalendar = () => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ['intakeCalendar', year, month],
    queryFn: () => getIntakeCalendar({ year, month }),
    select: (res) => res.result,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });

  const getAdjacentYearMonth = (offset: number) => {
    const base = new Date(year, month - 1 + offset, 1);
    return { year: base.getFullYear(), month: base.getMonth() + 1 };
  };

  // 깜빡임 방지 - 캐시 저장
  const prefetchMonth = ({ year, month }: { year: number; month: number }) => {
    queryClient.prefetchQuery({
      queryKey: ['intakeCalendar', year, month],
      queryFn: () => getIntakeCalendar({ year, month }),
    });
  };

  const handlePrevMonth = () => {
    const prev = getAdjacentYearMonth(-1);
    setYear(prev.year);
    setMonth(prev.month);
    prefetchMonth(getAdjacentYearMonth(-2));
  };

  const handleNextMonth = () => {
    const next = getAdjacentYearMonth(1);
    setYear(next.year);
    setMonth(next.month);
    prefetchMonth(getAdjacentYearMonth(2));
  };

  return {
    year,
    month,
    days: data?.days ?? [],
    isPending,
    selectedDate,
    setSelectedDate,
    handlePrevMonth,
    handleNextMonth,
  };
};

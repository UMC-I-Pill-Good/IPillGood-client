import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getConditionCurrentWeek } from '../api/getConditionCurrentWeek';
import { getConditionSummary } from '../api/getConditionSummary';
import { conditionQueryKeys } from '../constants/conditionQueryKeys';
import {
  type ConditionCurrentWeekResult,
  type ConditionMonthlyRecordsResult,
} from '../types/condition';

const DEFAULT_CURRENT_WEEK_STATUS: ConditionCurrentWeekResult = {
  today: '',
  weekStartOn: '',
  weekEndOn: '',
  isSunday: false,
  checkAvailable: false,
  checked: false,
  recordId: null,
  autoPopupAvailable: false,
  autoShownAt: null,
  dismissedAt: null,
  sundayIntakeWarningRequired: false,
};

const getDefaultMonthlyRecords = (
  year: number,
  month: number,
): ConditionMonthlyRecordsResult => ({
  year,
  month,
  averageConditionScore: null,
  averageVitalityScore: null,
  averageSleepHours: null,
  averageIntakeDaysCount: null,
  records: [],
});

export const getConditionYearMonth = (date: string) => {
  const [year, month] = date.slice(0, 10).split('-').map(Number);

  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    return null;
  }

  return { year, month };
};

export const useConditionQueries = () => {
  const initialDate = new Date();
  const [selectedYearMonth, setSelectedYearMonth] = useState<{
    year: number;
    month: number;
  } | null>(null);

  const currentWeekQuery = useQuery({
    queryKey: conditionQueryKeys.currentWeek(),
    queryFn: async () => {
      const response = await getConditionCurrentWeek();
      if (!response.isSuccess || !response.result) {
        throw new Error(response.message || '이번 주 컨디션 상태 조회에 실패했습니다.');
      }
      return response.result;
    },
    staleTime: 30_000,
  });

  const currentWeekStatus = currentWeekQuery.data ?? DEFAULT_CURRENT_WEEK_STATUS;
  const activeYearMonth =
    selectedYearMonth ??
    getConditionYearMonth(currentWeekStatus.today) ?? {
      year: initialDate.getFullYear(),
      month: initialDate.getMonth() + 1,
    };

  const monthlyRecordsQuery = useQuery({
    queryKey: conditionQueryKeys.monthlyRecords(activeYearMonth.year, activeYearMonth.month),
    queryFn: async () => {
      const response = await getConditionSummary(activeYearMonth.year, activeYearMonth.month);
      if (!response.isSuccess || !response.result) {
        throw new Error(response.message || '월별 컨디션 조회에 실패했습니다.');
      }
      return response.result;
    },
    enabled: Boolean(currentWeekQuery.data?.today),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60_000,
  });

  const handlePreviousMonth = () => {
    setSelectedYearMonth((previous) => {
      const { year, month } = previous ?? activeYearMonth;
      return month === 1 ? { year: year - 1, month: 12 } : { year, month: month - 1 };
    });
  };

  const handleNextMonth = () => {
    setSelectedYearMonth((previous) => {
      const { year, month } = previous ?? activeYearMonth;
      return month === 12 ? { year: year + 1, month: 1 } : { year, month: month + 1 };
    });
  };

  return {
    currentWeekStatus,
    homeSummaryData:
      monthlyRecordsQuery.data ??
      getDefaultMonthlyRecords(activeYearMonth.year, activeYearMonth.month),
    isMonthlyRecordsFetching: monthlyRecordsQuery.isFetching,
    handlePreviousMonth,
    handleNextMonth,
  };
};

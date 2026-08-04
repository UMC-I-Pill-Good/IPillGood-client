export const conditionQueryKeys = {
  all: ['conditions'] as const,
  currentWeek: () => [...conditionQueryKeys.all, 'current-week'] as const,
  monthlyRecordsAll: () => [...conditionQueryKeys.all, 'monthly-records'] as const,
  monthlyRecords: (year: number, month: number) =>
    [...conditionQueryKeys.monthlyRecordsAll(), year, month] as const,
  weekDetail: (recordId: number) =>
    [...conditionQueryKeys.all, 'weekly-records', recordId] as const,
};

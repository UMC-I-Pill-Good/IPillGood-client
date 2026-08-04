export const conditionQueryKeys = {
  all: ['conditions'] as const,
  currentWeek: () => [...conditionQueryKeys.all, 'current-week'] as const,
  monthlyRecords: (year: number, month: number) =>
    [...conditionQueryKeys.all, 'monthly-records', year, month] as const,
  weekDetail: (recordId: number) =>
    [...conditionQueryKeys.all, 'weekly-records', recordId] as const,
};

import type { QueryClient } from '@tanstack/react-query';

interface InvalidateActiveProductQueriesOptions {
  includeCabinetSearch?: boolean;
  includeNotificationSettings?: boolean;
}

export const invalidateActiveProductQueries = (
  queryClient: QueryClient,
  {
    includeCabinetSearch = false,
    includeNotificationSettings = false,
  }: InvalidateActiveProductQueriesOptions = {},
) => {
  queryClient.invalidateQueries({ queryKey: ['cabinetProducts'] });
  if (includeCabinetSearch) {
    queryClient.invalidateQueries({ queryKey: ['cabinetProductsSearch'] });
  }
  queryClient.invalidateQueries({ queryKey: ['activeProducts'] });
  queryClient.invalidateQueries({ queryKey: ['intakeToday'] });
  queryClient.invalidateQueries({ queryKey: ['intakeCalendar'] });
  queryClient.invalidateQueries({ queryKey: ['growthStage'] });
  queryClient.invalidateQueries({ queryKey: ['cabinetProductDetail'] });
  if (includeNotificationSettings) {
    queryClient.invalidateQueries({ queryKey: ['intakeNotificationSettings'] });
  }
};

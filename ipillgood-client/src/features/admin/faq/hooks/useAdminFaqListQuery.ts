import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getAdminFaqList } from '../api/Faq';
import type { FaqListParamsType } from '../types/Faq';

export const ADMIN_FAQ_LIST_QUERY_KEY = ['adminFaqList'] as const;

export const useAdminFaqListQuery = (params: FaqListParamsType) => {
  return useQuery({
    queryKey: [...ADMIN_FAQ_LIST_QUERY_KEY, params],
    queryFn: () => getAdminFaqList(params),
    placeholderData: keepPreviousData,
  });
};

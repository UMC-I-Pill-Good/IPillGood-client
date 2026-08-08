import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createAdminFaq, deleteAdminFaq, updateAdminFaq } from '../api/Faq';
import type { FaqUpsertRequestType } from '../types/Faq';
import { ADMIN_FAQ_LIST_QUERY_KEY } from './useAdminFaqListQuery';

type UpdateAdminFaqParamsType = {
  faqId: number;
  body: FaqUpsertRequestType;
};

export const useAdminFaqMutations = () => {
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ADMIN_FAQ_LIST_QUERY_KEY });
  };

  const createMutation = useMutation({
    mutationFn: createAdminFaq,
    onSuccess: handleSuccess,
  });
  const updateMutation = useMutation({
    mutationFn: ({ faqId, body }: UpdateAdminFaqParamsType) => updateAdminFaq(faqId, body),
    onSuccess: handleSuccess,
  });
  const deleteMutation = useMutation({
    mutationFn: deleteAdminFaq,
    onSuccess: handleSuccess,
  });

  return { createMutation, updateMutation, deleteMutation };
};

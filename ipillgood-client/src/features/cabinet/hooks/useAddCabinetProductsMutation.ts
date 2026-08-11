import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postCabinetProducts } from '../api/cabinet';

export const useAddCabinetProductsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productIdList: number[]) => {
      const response = await postCabinetProducts({ productIds: productIdList });

      if (!response.isSuccess) {
        throw new Error(response.message || '캐비닛에 영양제를 추가하지 못했어요.');
      }

      return response.result;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['cabinetProducts'] });
      void queryClient.invalidateQueries({ queryKey: ['cabinetProductsSearch'] });
    },
  });
};

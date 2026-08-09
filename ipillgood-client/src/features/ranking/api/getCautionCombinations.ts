import { axiosInstance } from '@/app/api/api';

import type { ProductPurchaseCheckApiResponse } from '../types/ranking';

export const getCautionCombinations = async (
  productId: number,
): Promise<ProductPurchaseCheckApiResponse> => {
  const { data } = await axiosInstance.get<ProductPurchaseCheckApiResponse>(
    `/products/${productId}/purchase-check`,
  );

  return data;
};

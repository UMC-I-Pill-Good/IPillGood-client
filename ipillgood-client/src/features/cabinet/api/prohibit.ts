import { axiosInstance } from '@/app/api/api';
import { ResponseProductConflicts } from '../types/prohibit';

export const getCabinetProductsSearch = async (
  productId: number,
): Promise<ResponseProductConflicts> => {
  const { data } = await axiosInstance.get<ResponseProductConflicts>(
    `/products/${productId}/purchase-check`,
  );

  return data;
};

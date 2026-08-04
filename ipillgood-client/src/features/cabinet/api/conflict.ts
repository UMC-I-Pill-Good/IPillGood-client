import { axiosInstance } from '@/app/api/api';
import { ResponseProductConflicts } from '../types/conflict';

export const getProductConflict = async (productId: number): Promise<ResponseProductConflicts> => {
  const { data } = await axiosInstance.get<ResponseProductConflicts>(
    `/products/${productId}/purchase-check`,
  );

  return data;
};

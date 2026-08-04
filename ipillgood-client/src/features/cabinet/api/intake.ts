import { axiosInstance } from '@/app/api/api';
import { ResponseIntakeConflicts } from '../types/intake';

export const getIntakeConflict = async (productId: number): Promise<ResponseIntakeConflicts> => {
  const { data } = await axiosInstance.get<ResponseIntakeConflicts>(
    `/products/${productId}/purchase-check`,
  );

  return data;
};

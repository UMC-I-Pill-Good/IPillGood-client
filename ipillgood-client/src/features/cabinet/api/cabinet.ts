import { axiosInstance } from '@/app/api/api';
import { ResponseCabinetProducts } from '../types/cabinet';

export const getCabinetProducts = async (): Promise<ResponseCabinetProducts> => {
  const { data } = await axiosInstance.get<ResponseCabinetProducts>('/cabinet/products');

  return data;
};

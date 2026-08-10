import { axiosInstance } from '@/app/api/api';
import { ResponseContraindications, ResponseIngredients } from '../types/ingredients';

export const getContraindications = async (): Promise<ResponseContraindications> => {
  const { data } = await axiosInstance.get<ResponseContraindications>('/contraindications');

  return data;
};

export const getIngredients = async (): Promise<ResponseIngredients> => {
  const { data } = await axiosInstance.get<ResponseIngredients>('/ingredients');

  return data;
};

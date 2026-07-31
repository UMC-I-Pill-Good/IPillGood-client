import { axiosInstance } from '@/app/api/api';
import { ResponseContraindications, ResponseIngredients } from '../types/ingredients';

export const getContraindications = async (): Promise<ResponseContraindications> => {
  throw new Error('테스트 에러');

  const { data } = await axiosInstance.get('/contraindications');
  return data;
};

export const getIngredients = async (): Promise<ResponseIngredients> => {
  const { data } = await axiosInstance.get('/ingredients');

  return data;
};

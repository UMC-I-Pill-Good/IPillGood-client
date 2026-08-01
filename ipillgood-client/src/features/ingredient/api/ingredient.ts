import { axiosInstance } from '@/app/api/api';
import { IngredientDetailResponseType } from '../types/ingredient';

// 영양성분 상세 조회
export const getIngredientDetail = async (ingredientId: number) => {
  const { data } = await axiosInstance.get<IngredientDetailResponseType>(
    `/ingredients/${ingredientId}`,
  );

  return data;
};

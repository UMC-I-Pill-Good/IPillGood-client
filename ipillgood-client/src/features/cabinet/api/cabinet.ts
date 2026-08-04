import { axiosInstance } from '@/app/api/api';
import {
  ResponseAddProducts,
  ResponseCabinetProducts,
  ResponseSearchProducts,
  SearchProductParams,
} from '../types/cabinet';

export const getCabinetProducts = async (): Promise<ResponseCabinetProducts> => {
  const { data } = await axiosInstance.get<ResponseCabinetProducts>('/cabinet/products');

  return data;
};

export const getCabinetProductsSearch = async (
  params: SearchProductParams,
): Promise<ResponseSearchProducts> => {
  const { data } = await axiosInstance.get<ResponseSearchProducts>('/cabinet/product-candidates', {
    params,
  });

  return data;
};

export const postCabinetProducts = async (body: {
  productIds: number[];
}): Promise<ResponseAddProducts> => {
  const { data } = await axiosInstance.post<ResponseAddProducts>('/cabinet/products', body);

  return data;
};

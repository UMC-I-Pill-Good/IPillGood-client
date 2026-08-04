import { axiosInstance } from '@/app/api/api';
import {
  ResponseCabinetProducts,
  ResponseAddProducts,
  ResponseSearchProducts,
  SearchProductParams,
  ResponseDeleteProducts,
  ResponseCabinetProductDetail,
} from '../types/cabinet';

export const getCabinetProducts = async (): Promise<ResponseCabinetProducts> => {
  const { data } = await axiosInstance.get<ResponseCabinetProducts>('/cabinet/products');

  return data;
};

export const getCabinetProductsDetail = async (
  memberProductId: number,
): Promise<ResponseCabinetProductDetail> => {
  const { data } = await axiosInstance.get<ResponseCabinetProductDetail>(
    `/cabinet/products/${memberProductId}`,
  );

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

export const deleteCabinetProducts = async (
  memberProductIds: number[],
): Promise<ResponseDeleteProducts> => {
  const { data } = await axiosInstance.delete<ResponseDeleteProducts>('/cabinet/products', {
    data: { memberProductIds },
  });

  return data;
};

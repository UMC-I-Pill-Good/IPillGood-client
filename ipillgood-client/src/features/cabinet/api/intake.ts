import { axiosInstance } from '@/app/api/api';
import {
  RequestIntakeProduct,
  RequestIntakeUpdate,
  ResponseIntakeConflicts,
  ResponseIntakeProduct,
  ResponseIntakeUpdate,
} from '../types/intake';

export const postIntakeProduct = async (
  body: RequestIntakeProduct,
): Promise<ResponseIntakeProduct> => {
  const { data } = await axiosInstance.post<ResponseIntakeProduct>('/intake/active-products', body);

  return data;
};

export const patchActiveProduct = async (
  activeProductId: number,
  body: RequestIntakeUpdate,
): Promise<ResponseIntakeUpdate> => {
  const { data } = await axiosInstance.patch<ResponseIntakeUpdate>(
    `/intake/active-products/${activeProductId}`,
    body,
  );

  return data;
};

export const getIntakeConflict = async (
  memberProductId: number,
): Promise<ResponseIntakeConflicts> => {
  const { data } = await axiosInstance.get<ResponseIntakeConflicts>(
    '/intake/compatibility-checks',
    {
      params: {
        memberProductId,
      },
    },
  );

  return data;
};

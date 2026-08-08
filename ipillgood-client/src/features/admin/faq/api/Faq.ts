import { axiosInstance } from '@/app/api/api';
import type { CommonResponse } from '@/shared/types/api';

import type {
  FaqListParamsType,
  FaqListResultType,
  FaqUpsertRequestType,
} from '../types/Faq';

const getValidatedResponse = <T>(response: CommonResponse<T>) => {
  if (!response.isSuccess) {
    throw new Error(response.message);
  }

  return response;
};

export const getAdminFaqList = async (params: FaqListParamsType) => {
  const { data } = await axiosInstance.get<CommonResponse<FaqListResultType>>(
    '/admin/faqs',
    { params },
  );

  return getValidatedResponse(data);
};

export const createAdminFaq = async (body: FaqUpsertRequestType) => {
  const { data } = await axiosInstance.post<CommonResponse<null>>('/admin/faqs', body);

  return getValidatedResponse(data);
};

export const updateAdminFaq = async (faqId: number, body: FaqUpsertRequestType) => {
  const { data } = await axiosInstance.put<CommonResponse<null>>(
    `/admin/faqs/${faqId}`,
    body,
  );

  return getValidatedResponse(data);
};

export const deleteAdminFaq = async (faqId: number) => {
  const { data } = await axiosInstance.delete<CommonResponse<null>>(`/admin/faqs/${faqId}`);

  return getValidatedResponse(data);
};

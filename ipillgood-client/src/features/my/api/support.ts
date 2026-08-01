import { axiosInstance } from '@/app/api/api';
import { FaqsParamsType, FaqsResponseType, SupportResponseType } from '../types/faq.type';

// 문의/고객센터 조회
export const getSupport = async () => {
  const { data } = await axiosInstance.get<SupportResponseType>('/support');

  return data;
};

// FAQ 목록 조회
export const getFaqs = async (params: FaqsParamsType) => {
  const { data } = await axiosInstance.get<FaqsResponseType>('/support/faqs', {
    params,
  });
  return data;
};

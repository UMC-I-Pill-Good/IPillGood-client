import { axiosInstance } from '@/app/api/api';
import { DocumentCategoryType, PolicyDocumentResponseType } from '../types/policy.type';

// 최신 약관/정책 조회
export const getLatestPolicyDocument = async (documentType: DocumentCategoryType) => {
  const { data } = await axiosInstance.get<PolicyDocumentResponseType>('/policy-documents/latest', {
    params: { documentType },
  });

  return data;
};

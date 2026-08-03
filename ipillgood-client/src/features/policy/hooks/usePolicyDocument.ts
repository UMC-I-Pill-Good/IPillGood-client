import { useQuery } from '@tanstack/react-query';
import { DocumentCategoryType } from '../types/policy.type';
import { getLatestPolicyDocument } from '../api/policy';

export const usePolicyDocument = (documentType: DocumentCategoryType) => {
  return useQuery({
    queryKey: ['policyDocument', documentType],
    queryFn: () => getLatestPolicyDocument(documentType),
    select: (res) => res.result.documents[0],
    staleTime: 1000 * 60 * 60,
  });
};

import { CommonResponse } from '@/shared/types';

export type DocumentCategoryType =
  'SERVICE_TERMS' | 'PRIVACY_COLLECTION' | 'HEALTH_INFO_COLLECTION' | 'MARKETING';

export type PolicyDocumentType = {
  policyDocumentId: number;
  documentType: DocumentCategoryType;
  title: string;
  content: string;
  required: boolean;
  version: string;
  effectiveAt: string;
};

type PolicyDocumentListResultType = {
  documents: PolicyDocumentType[];
};

export type PolicyDocumentResponseType = CommonResponse<PolicyDocumentListResultType>;

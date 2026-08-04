import { CommonResponse } from '@/shared/types';

export type DuePrompt = {
  activeProductId: number;
  productId: number;
  productName: string;
};

export type ResponseDuePrompts = CommonResponse<{
  duePrompts: DuePrompt[];
}>;

export type ResponseDuePromptsDismiss = CommonResponse<{
  activeProductId: number;
  dismissedAt: string;
}>;

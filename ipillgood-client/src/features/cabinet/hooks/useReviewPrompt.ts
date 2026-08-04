import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { patchReviewPromptsDismiss } from '../api/review-prompt';
import { useReviewPromptsQuery } from './useReviewPromptsQuery';

export const useReviewPrompt = (enabled: boolean) => {
  const [dismissedPromptId, setDismissedPromptId] = useState<number | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useReviewPromptsQuery({ enabled });
  const duePrompt = data?.result.duePrompts[0];

  const dismissMutation = useMutation({
    mutationFn: patchReviewPromptsDismiss,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviewPrompts'] });
    },
  });

  const dismiss = () => {
    if (!duePrompt) return;

    setDismissedPromptId(duePrompt.activeProductId);
    dismissMutation.mutate(duePrompt.activeProductId);
  };

  const navigateToReviewAdd = () => {
    if (!duePrompt) return;

    router.push(`/reviews/reviews-add?productId=${duePrompt.productId}`);
  };

  return {
    duePrompt,
    isOpen: enabled && duePrompt !== undefined && duePrompt.activeProductId !== dismissedPromptId,
    dismiss,
    navigateToReviewAdd,
  };
};

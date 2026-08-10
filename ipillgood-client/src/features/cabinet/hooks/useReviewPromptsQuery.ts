import { useQuery } from '@tanstack/react-query';
import { getReviewPrompts } from '../api/review-prompt';

export const useReviewPromptsQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['reviewPrompts'],
    queryFn: getReviewPrompts,
    enabled: options?.enabled,
  });
};

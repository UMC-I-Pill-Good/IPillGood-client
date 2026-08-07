import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postRecommendationConfirm } from '../api/recommendation';

export const useRecommendationConfirmMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postRecommendationConfirm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
    },
  });
};

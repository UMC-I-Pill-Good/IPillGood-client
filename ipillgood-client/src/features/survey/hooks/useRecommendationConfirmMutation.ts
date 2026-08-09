import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocalStorage } from '@/shared/hooks';
import { postRecommendationConfirm } from '../api/recommendation';

export const useRecommendationConfirmMutation = () => {
  const queryClient = useQueryClient();
  const { setOnboardingCompleted } = useLocalStorage();

  return useMutation({
    mutationFn: postRecommendationConfirm,
    onSuccess: ({ result }) => {
      setOnboardingCompleted(result.onboardingCompleted);
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
    },
  });
};

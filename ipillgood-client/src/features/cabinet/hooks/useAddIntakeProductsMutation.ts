import { postIntakeProduct } from '@/features/cabinet/api/intake';
import { intakeTodayQueryKey } from '@/features/home/hooks/useIntakeToday';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface AddIntakeProductsParams {
  memberProductIds: number[];
  intakeTime: string;
  frequency: string;
}

export const useAddIntakeProductsMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ memberProductIds, intakeTime, frequency }: AddIntakeProductsParams) =>
      Promise.all(
        memberProductIds.map((memberProductId) =>
          postIntakeProduct({ memberProductId, intakeTime, frequency }),
        ),
      ),
    onSuccess: (responses) => {
      const failedResponse = responses.find((response) => !response.isSuccess);

      if (failedResponse) {
        alert(failedResponse.message);
        return;
      }

      queryClient.invalidateQueries({ queryKey: ['cabinetProducts'] });
      queryClient.invalidateQueries({ queryKey: ['activeProducts'] });
      queryClient.invalidateQueries({ queryKey: intakeTodayQueryKey });
      router.push('/cabinet');
    },
    onError: (error) => {
      const message = isAxiosError<{ message?: string }>(error)
        ? error.response?.data.message
        : undefined;

      alert(message ?? '섭취 중인 영양제로 추가하지 못했어요.');
    },
  });
};

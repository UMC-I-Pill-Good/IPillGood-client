import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { showToast } from '@/shared/utils';
import { useHealthConcernRecommendations } from './useHealthConcernRecommendations';

export const useHealthResultFlow = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const majorCategory = searchParams.get('majorCategory') || '';
  const majorCategoryLabel = searchParams.get('majorCategoryLabel') || '';
  const minorCategory = searchParams.get('minorCategory') || '';
  const minorCategoryLabel = searchParams.get('minorCategoryLabel') || '';

  const { data, isLoading, error } = useHealthConcernRecommendations({
    majorCategory,
    minorCategory,
  });

  const handleClose = () => router.push('/condition');

  const handleIngredientClick = (ingredientId: number) => {
    router.push(`/ingredient/${ingredientId}`);
  };

  const isValid = Boolean(majorCategory && minorCategory);

  useEffect(() => {
    if (isValid) return;

    showToast.error('선택된 건강 상태 정보가 없습니다. 다시 선택해 주세요.');
    router.replace('/condition');
  }, [isValid, router]);

  return {
    majorCategoryLabel,
    minorCategoryLabel,
    data,
    isLoading,
    error,
    isValid,
    handleClose,
    handleIngredientClick,
  };
};

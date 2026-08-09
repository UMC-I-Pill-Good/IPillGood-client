import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { showToast } from '@/shared/utils';
import { useHealthConcernRecommendations } from './useHealthConcernRecommendations';

/**
 * 건강 상태 결과 페이지의 흐름 및 비즈니스 상태 제어 커스텀 훅
 */
export const useHealthResultFlow = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const majorCategory = searchParams.get('majorCategory') || '';
  const majorCategoryLabel = searchParams.get('majorCategoryLabel') || '';
  const minorCategory = searchParams.get('minorCategory') || '';
  const minorCategoryLabel = searchParams.get('minorCategoryLabel') || '';

  // API 호출 연동
  const { data, isLoading, error } = useHealthConcernRecommendations({
    majorCategory,
    minorCategory,
  });

  const handleBack = () => router.push('/condition/health-status');
  const handleClose = () => router.push('/condition');

  const handleIngredientClick = (ingredientId: number) => {
    router.push(`/ingredient/${ingredientId}`);
  };

  const isValid = Boolean(majorCategory && minorCategory);

  useEffect(() => {
    if (isValid) return;

    showToast.error('선택된 건강 상태 정보가 없습니다. 다시 선택해 주세요.');
  }, [isValid]);

  return {
    majorCategoryLabel,
    minorCategoryLabel,
    data,
    isLoading,
    error,
    isValid,
    handleBack,
    handleClose,
    handleIngredientClick,
  };
};

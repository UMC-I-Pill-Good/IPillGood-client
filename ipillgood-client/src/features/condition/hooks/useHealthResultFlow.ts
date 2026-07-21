import { useRouter, useSearchParams } from 'next/navigation';
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

  const isValid = Boolean(majorCategory && minorCategory);

  return {
    majorCategoryLabel,
    minorCategoryLabel,
    data,
    isLoading,
    error,
    isValid,
    handleBack,
    handleClose,
  };
};

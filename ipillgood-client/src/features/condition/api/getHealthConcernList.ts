import type { HealthConcernListResponse } from '../types/healthStatus';

/**
 * 건강 고민 대분류/소분류 목록 조회 (GET /health-converns)
 * @param majorCategory 특정 대분류 코드 (옵션)
 */
export const getHealthConcernList = async (
  majorCategory?: string,
): Promise<HealthConcernListResponse> => {
  console.log('API GET /health-converns 호출 - majorCategory:', majorCategory);

  return {
    isSuccess: true,
    code: 'SUCCESS200_1',
    message: '요청이 성공적으로 처리되었습니다.',
    result: {
      majorCategories: [
        {
          majorCategory: 'CARDIOVASCULAR',
          majorCategoryName: '심혈관계',
          minorConcerns: [
            { healthConcernId: 15, minorCategory: 'TRIGLYCERIDE', minorCategoryName: '혈중 중성지방' },
            { healthConcernId: 16, minorCategory: 'CHOLESTEROL', minorCategoryName: '콜레스테롤' },
            { healthConcernId: 17, minorCategory: 'BLOOD_PRESSURE', minorCategoryName: '혈압' },
            { healthConcernId: 18, minorCategory: 'BLOOD_FLOW', minorCategoryName: '혈행' },
          ],
        },
      ],
    },
  };
};

import { type SubmitHealthStateQueryRequestType, type SubmitHealthStateQueryResponse } from '../types/healthStatus';

/**
 * 궁금한 건강 상태 질의 제출 (POST /health-state-queries)
 */
export const postHealthStateQuery = async (
  request: SubmitHealthStateQueryRequestType,
): Promise<SubmitHealthStateQueryResponse> => {
  // 실제 백엔드 API 연동 시 주석 해제하여 사용
  // const response = await fetch('/api/health-state-queries', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(request),
  // });
  // return response.json();

  console.log('API 호출: POST /health-state-queries', request);

  return {
    isSuccess: true,
    code: 'COMMON200',
    message: '성공입니다.',
    result: {
      healthConcernId: request.healthConcernId,
      majorCategoryName: '근육계',
      minorCategoryName: '근육',
      declineCause: '근육 합성에 필요한 핵심 단백질 및 아미노산 섭취가 부족할 경우...',
      recommendations: [],
    },
  };
};

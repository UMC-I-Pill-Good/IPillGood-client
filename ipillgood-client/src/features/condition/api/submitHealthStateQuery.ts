import type {
  SubmitHealthStateQueryRequestType,
  SubmitHealthStateQueryResponse,
} from '../types/healthStatus';

/**
 * 궁금한 건강 상태 질의 제출 (POST /health-state-queries)
 */
export const submitHealthStateQuery = async (
  request: SubmitHealthStateQueryRequestType,
): Promise<SubmitHealthStateQueryResponse> => {
  console.log('API POST /health-state-queries 호출 - body:', request);

  return {
    isSuccess: true,
    code: 'SUCCESS200_1',
    message: '요청이 성공적으로 처리되었습니다.',
    result: {
      healthConcernId: request.healthConcernId,
      majorCategoryName: '심혈관계',
      minorCategoryName: '혈행',
      declineCause: '혈행이 원활하지 않으면 손발 저림, 부종이 나타날 수 있어요.',
      recommendations: [
        {
          ingredientId: 9,
          ingredientName: '마그네슘',
          imageUrl: 'https://cdn.apilgood.com/ingredients/magnesium.png',
          description: '신경과 근육 기능 유지에 도움을 줘요',
          tags: ['근육/신경 기능 유지', '스트레스 완화'],
          alreadyInCabinet: false,
        },
      ],
    },
  };
};

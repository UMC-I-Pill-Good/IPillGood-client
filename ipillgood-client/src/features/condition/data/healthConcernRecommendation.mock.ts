import { type HealthConcernRecommendationsResult } from '../types/healthStatus';

export const healthConcernRecommendationMockData: HealthConcernRecommendationsResult = {
  healthConcernId: 1,
  majorCategory: 'SENSORY_SYSTEM',
  minorCategory: 'EYES',
  declineCause: '건강 상태 페이지 정보 바탕으로\n요약 및 원인 설명',
  recommendedIngredients: [
    {
      ingredientId: 1,
      name: '마그네슘',
      description: '신경과 근육 기능 유지 및 이완에 도움을 줘요.\n눈 떨림 완화에도 도움을 줄 수 있어요.',
      imageUrl: 'ingredients/magnesium.png',
      effectKeywords: [
        '근육, 신경 기능 유지',
        '스트레스 완화',
        '피로 개선',
      ],
      hasCabinetProduct: true,
    },
    {
      ingredientId: 2,
      name: '마그네슘',
      description: '신경과 근육 기능 유지 및 이완에 도움을 줘요.\n눈 떨림 완화에도 도움을 줄 수 있어요.',
      imageUrl: 'ingredients/magnesium.png',
      effectKeywords: [
        '근육, 신경 기능 유지',
        '스트레스 완화',
        '피로 개선',
      ],
      hasCabinetProduct: false,
    },
    {
      ingredientId: 3,
      name: '마그네슘',
      description: '신경과 근육 기능 유지 및 이완에 도움을 줘요.\n눈 떨림 완화에도 도움을 줄 수 있어요.',
      imageUrl: 'ingredients/magnesium.png',
      effectKeywords: [
        '근육, 신경 기능 유지',
        '스트레스 완화',
        '피로 개선',
      ],
      hasCabinetProduct: false,
    },
  ],
};

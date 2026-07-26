import type { RecommendationResultType } from '../types/recommendedSupplement.type';

export const mockRecommendationResult: RecommendationResultType = {
  recommendationBatchId: 901,
  status: 'COMPLETED',
  healthSummary:
    '최근 피로감과 수면 부족이 두드러지는 상태예요. 본 결과는 참고용 정보이며, 정확한 상담이 필요하다면 전문가와 상담을 권장드려요.',
  recommendations: [
    {
      rankNo: 1,
      ingredientId: 14,
      ingredientName: '비타민D',
      reason: '피로 개선 / 활력 증진',
      imageUrl: '/m.svg',
      tags: ['활력', '면역력', '기초 영양'],
      recommendedDosageText: '1일 1회, 1000IU',
      recommendedTimeText: '아침 식사 후',
      warningText: null,
    },
    {
      rankNo: 2,
      ingredientId: 7,
      ingredientName: '마그네슘',
      reason: '수면·근육 이완에 도움을 줄 수 있어요.',
      imageUrl: '/m.svg',
      tags: ['근육', '신경 기능 유지', '스트레스 완화(효능)', '활력', '면역력', '기초 영양'],
      recommendedDosageText: '350~420mg',
      recommendedTimeText: '취침 전 섭취 추천',
      warningText: null,
    },
    {
      rankNo: 3,
      ingredientId: 12,
      ingredientName: '루테인',
      reason: '눈 건강 유지에 도움을 줄 수 있어요.',
      imageUrl: '/m.svg',
      tags: ['눈 건강', '항산화'],
      recommendedDosageText: '1일 1회, 20mg',
      recommendedTimeText: '점심 식사 후',
      warningText: null,
    },
  ],
};

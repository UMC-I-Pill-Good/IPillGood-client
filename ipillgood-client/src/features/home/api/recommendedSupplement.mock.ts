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
      imageUrl:
        'https://private-user-images.githubusercontent.com/124152742/623172730-b974f1fc-84f0-4a06-963b-6c7fe6b04719.svg?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3ODQyODUzNjIsIm5iZiI6MTc4NDI4NTA2MiwicGF0aCI6Ii8xMjQxNTI3NDIvNjIzMTcyNzMwLWI5NzRmMWZjLTg0ZjAtNGEwNi05NjNiLTZjN2ZlNmIwNDcxOS5zdmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNzE3JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDcxN1QxMDQ0MjJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1hMDUzZjRlNWY5NTEwMWZiMmY5NzczNjhmMDUyOGI5YzQ1M2QyYWYwMTE5N2IyMjE1OTAzYzczMzc0YzRlZWFlJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZzdmclMkJ4bWwifQ.iRAMPcA8bFRVkPxc23wALZ35czYmvBOeLkkRaacBucc',
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
      imageUrl:
        'https://private-user-images.githubusercontent.com/124152742/623172730-b974f1fc-84f0-4a06-963b-6c7fe6b04719.svg?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3ODQyODUzNjIsIm5iZiI6MTc4NDI4NTA2MiwicGF0aCI6Ii8xMjQxNTI3NDIvNjIzMTcyNzMwLWI5NzRmMWZjLTg0ZjAtNGEwNi05NjNiLTZjN2ZlNmIwNDcxOS5zdmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNzE3JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDcxN1QxMDQ0MjJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1hMDUzZjRlNWY5NTEwMWZiMmY5NzczNjhmMDUyOGI5YzQ1M2QyYWYwMTE5N2IyMjE1OTAzYzczMzc0YzRlZWFlJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZzdmclMkJ4bWwifQ.iRAMPcA8bFRVkPxc23wALZ35czYmvBOeLkkRaacBucc',
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
      imageUrl:
        'https://private-user-images.githubusercontent.com/124152742/623172730-b974f1fc-84f0-4a06-963b-6c7fe6b04719.svg?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3ODQyODUzNjIsIm5iZiI6MTc4NDI4NTA2MiwicGF0aCI6Ii8xMjQxNTI3NDIvNjIzMTcyNzMwLWI5NzRmMWZjLTg0ZjAtNGEwNi05NjNiLTZjN2ZlNmIwNDcxOS5zdmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNzE3JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDcxN1QxMDQ0MjJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1hMDUzZjRlNWY5NTEwMWZiMmY5NzczNjhmMDUyOGI5YzQ1M2QyYWYwMTE5N2IyMjE1OTAzYzczMzc0YzRlZWFlJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZzdmclMkJ4bWwifQ.iRAMPcA8bFRVkPxc23wALZ35czYmvBOeLkkRaacBucc',
      tags: ['눈 건강', '항산화'],
      recommendedDosageText: '1일 1회, 20mg',
      recommendedTimeText: '점심 식사 후',
      warningText: null,
    },
  ],
};

import type { IngredientDetailType } from '../types/ingredient';

export const MOCK_INGREDIENT_DETAIL: IngredientDetailType = {
  ingredientId: 1,
  name: '마그네슘',
  description:
    '마그네슘은 신경과 근육 기능 유지에 필요하며,\n에너지 대사와 뼈 건강 유지에도 관여하는 필수 미네랄입니다.',
  imageUrl: '/m.svg',
  effects: ['신경과 근육 기능 유지에 도움', '에너지 이용에 필요', '뼈 건강 유지에 도움'],
  cautions: ['과다 섭취 시 설사, 복통 등 위장 장애가 나타날 수 있습니다.'],
  contraindicatedCombinations: [
    {
      targetIngredientId: 3,
      targetIngredientName: '칼슘',
      type: 'CAUTION',
      reason: '동시 복용 시 흡수에 영향을 줄 수 있습니다.',
    },
  ],
  recommendedIntake: '300 ~ 350mg',
  recommendedIntakeTime: '식후 섭취 권장',
  hasCabinetProduct: true,
  alternativeFoods: [
    { name: '아몬드', contentPer100g: '100g당 마그네슘 270mg' },
    { name: '바나나', contentPer100g: '100g당 마그네슘 270mg' },
    { name: '치즈', contentPer100g: '100g당 마그네슘 270mg' },
    { name: '우유', contentPer100g: '100g당 마그네슘 270mg' },
    { name: '고구마', contentPer100g: '100g당 마그네슘 270mg' },
    { name: '감자', contentPer100g: '100g당 마그네슘 270mg' },
  ],
};

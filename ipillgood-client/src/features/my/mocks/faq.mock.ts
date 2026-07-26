import type { FaqSummaryType } from '../types/faq.type';

export const mockFaqList: FaqSummaryType[] = [
  {
    faqId: 1,
    category: 'RECOMMEND',
    question: '영양 성분 추천은 어떻게 이루어 지나요?',
    answer:
      '아필굿은 설문 조사 결과와 개인의 건강 정보, 섭취 이력 등을 종합적으로 분석해 사용자에게 가장 적합한 영양 성분을 추천해 드려요. 추천 결과는 참고용이며, 필요 시 전문가와 상담을 권장드려요!',
    displayOrder: 1,
  },
  {
    faqId: 2,
    category: 'RECOMMEND',
    question: '추천된 영양 성분이 제 몸에 안 맞으면 어떻게 하나요?',
    answer:
      '추천 결과는 설문 응답을 바탕으로 한 참고용 정보예요. 섭취 후 불편함이 느껴지면 즉시 섭취를 중단하고 전문가와 상담해 주세요.',
    displayOrder: 2,
  },
  {
    faqId: 3,
    category: 'RECOMMEND',
    question: '영양 성분 추천 결과는 얼마나 자주 업데이트되나요?',
    answer:
      '설문을 다시 진행하거나 건강 정보, 섭취 이력이 새롭게 쌓일 때마다 추천 결과가 갱신돼요. 마이페이지에서 설문을 다시 진행할 수 있어요.',
    displayOrder: 3,
  },
  {
    faqId: 4,
    category: 'INTAKE',
    question: '연속 섭취일 복구 방법은 없나요?',
    answer:
      '아쉽지만 하루라도 섭취를 기록하지 않으면 연속 섭취일은 초기화돼요. 알림 설정을 통해 섭취를 놓치지 않도록 도와드릴게요.',
    displayOrder: 4,
  },
  {
    faqId: 5,
    category: 'INTAKE',
    question: '섭취 기록은 어떻게 입력하나요?',
    answer:
      '홈 화면의 오늘 섭취 체크 영역에서 섭취한 영양 성분을 선택하면 바로 기록돼요. 하루 중 언제든 여러 번 수정할 수 있어요.',
    displayOrder: 5,
  },
  {
    faqId: 6,
    category: 'INTAKE',
    question: '섭취 이력은 어디서 확인할 수 있나요?',
    answer:
      '홈 화면의 섭취 캘린더에서 날짜별 섭취 이력을 확인할 수 있어요. 날짜를 선택하면 그날 섭취한 성분을 자세히 볼 수 있어요.',
    displayOrder: 6,
  },
  {
    faqId: 7,
    category: 'ALARM',
    question: '복용 알림은 어떻게 설정하나요?',
    answer:
      '마이페이지 > 알림 설정에서 원하는 시간대에 복용 알림을 켤 수 있어요. 성분별로 알림 시간을 다르게 설정할 수도 있어요.',
    displayOrder: 7,
  },
  {
    faqId: 8,
    category: 'ALARM',
    question: '알림이 오지 않아요, 어떻게 해야 하나요?',
    answer:
      '기기의 알림 권한이 꺼져 있으면 알림이 오지 않을 수 있어요. 휴대폰 설정에서 아필굿 알림 권한이 허용되어 있는지 먼저 확인해 주세요.',
    displayOrder: 8,
  },
  {
    faqId: 9,
    category: 'ALARM',
    question: '알림 시간을 여러 개 설정할 수 있나요?',
    answer:
      '네, 아침·점심·저녁 등 필요한 만큼 알림 시간을 추가해 성분별로 다르게 받아볼 수 있어요.',
    displayOrder: 9,
  },
  {
    faqId: 10,
    category: 'ETC',
    question: '회원 탈퇴는 어떻게 하나요?',
    answer:
      '마이페이지 > 설정 > 회원 탈퇴에서 진행할 수 있어요. 탈퇴 시 섭취 이력, 추천 결과 등 모든 데이터가 삭제되니 신중히 진행해 주세요.',
    displayOrder: 10,
  },
  {
    faqId: 11,
    category: 'ETC',
    question: '개인정보는 안전하게 보호되나요?',
    answer:
      '아필굿은 개인정보처리방침에 따라 회원님의 정보를 안전하게 관리하고 있어요. 자세한 내용은 마이페이지 > 개인정보처리방침에서 확인할 수 있어요.',
    displayOrder: 11,
  },
  {
    faqId: 12,
    category: 'ETC',
    question: '앱 오류가 발생했을 때는 어떻게 문의하나요?',
    answer:
      '문의/고객센터 하단의 이메일로 오류 상황과 스크린샷을 함께 보내주시면 빠르게 확인 후 답변드릴게요.',
    displayOrder: 12,
  },
];

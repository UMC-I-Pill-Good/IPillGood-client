import { create } from 'zustand';
import { type ConditionHomeSummaryResult } from '../types/condition';

export type ConditionCheckStep = 1 | 2 | 3 | 4;

interface ConditionState {
  selectedWeekIndex: number | null;
  setSelectedWeekIndex: (index: number | null) => void;
  closeModal: () => void;

  // 홈 요약 데이터 상태 (1회만 API로 호출)
  homeSummaryData: ConditionHomeSummaryResult;
  setHomeSummaryData: (data: ConditionHomeSummaryResult) => void;
  markWeekCompleted: () => void;

  // 컨디션 체크 팝업 모달 전역 상태 및 입력 데이터
  isCheckModalOpen: boolean;
  isSundayModalOpen: boolean;
  checkStep: ConditionCheckStep;
  vitalityScore: number;
  sleepHours: number;
  sleepMinutes: number;

  openCheckModal: (step?: ConditionCheckStep) => void;
  forceOpenCheckModal: (step?: ConditionCheckStep) => void;
  closeCheckModal: () => void;
  openSundayModal: () => void;
  closeSundayModal: () => void;
  setCheckStep: (step: ConditionCheckStep) => void;
  setVitalityScore: (score: number) => void;
  setSleepTime: (hours: number, minutes: number) => void;
  resetConditionData: () => void;
}

const DEFAULT_VITALITY_SCORE = 3;
const DEFAULT_SLEEP_HOURS = 7;
const DEFAULT_SLEEP_MINUTES = 30;

// API 로드 전/실패 시 가짜 유저 데이터를 기본값으로 보여주지 않도록 초기화
const DEFAULT_HOME_SUMMARY: ConditionHomeSummaryResult = {
  currentWeekCompleted: false,
  monthlyGraph: [],
  monthlySummary: {
    avgVitalityScore: null,
    avgSleepHours: null,
    intakeDays: 0,
    intakeTotalDays: 0,
  },
};

export const useConditionStore = create<ConditionState>((set) => ({
  selectedWeekIndex: null,
  setSelectedWeekIndex: (index) => set({ selectedWeekIndex: index }),
  closeModal: () => set({ selectedWeekIndex: null }),

  homeSummaryData: DEFAULT_HOME_SUMMARY,
  setHomeSummaryData: (data) => set({ homeSummaryData: data }),
  markWeekCompleted: () =>
    set((state) => ({
      homeSummaryData: {
        ...state.homeSummaryData,
        currentWeekCompleted: true,
      },
    })),

  isCheckModalOpen: false,
  isSundayModalOpen: false,
  checkStep: 1,
  vitalityScore: DEFAULT_VITALITY_SCORE,
  sleepHours: DEFAULT_SLEEP_HOURS,
  sleepMinutes: DEFAULT_SLEEP_MINUTES,

  // 전역 팝업 오픈 요청 시 자동 일요일 판단 감지 (new Date().getDay() === 0)
  openCheckModal: (step = 1) => {
    const isTodaySunday = new Date().getDay() === 0;
    if (isTodaySunday) {
      set({ isSundayModalOpen: true, isCheckModalOpen: false, checkStep: step });
    } else {
      set({ isSundayModalOpen: false, isCheckModalOpen: true, checkStep: step });
    }
  },

  // 일요일 경고 모달에서 '계속하기' 클릭 시 무조건 체크 팝업 오픈
  forceOpenCheckModal: (step = 1) =>
    set({ isSundayModalOpen: false, isCheckModalOpen: true, checkStep: step }),

  closeCheckModal: () =>
    set({
      isCheckModalOpen: false,
      isSundayModalOpen: false,
      checkStep: 1,
      vitalityScore: DEFAULT_VITALITY_SCORE,
      sleepHours: DEFAULT_SLEEP_HOURS,
      sleepMinutes: DEFAULT_SLEEP_MINUTES,
    }),

  openSundayModal: () => set({ isSundayModalOpen: true }),
  closeSundayModal: () => set({ isSundayModalOpen: false }),

  setCheckStep: (step) => set({ checkStep: step }),

  setVitalityScore: (score) => set({ vitalityScore: score }),

  setSleepTime: (hours, minutes) =>
    set({ sleepHours: hours, sleepMinutes: minutes }),

  resetConditionData: () =>
    set({
      vitalityScore: DEFAULT_VITALITY_SCORE,
      sleepHours: DEFAULT_SLEEP_HOURS,
      sleepMinutes: DEFAULT_SLEEP_MINUTES,
    }),
}));

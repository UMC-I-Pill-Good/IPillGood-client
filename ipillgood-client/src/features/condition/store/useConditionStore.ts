import { create } from 'zustand';
import { type ConditionHomeSummaryResult } from '../types/condition';

export type ConditionCheckStep = 1 | 2 | 3 | 4;

interface ConditionState {
  selectedWeekIndex: number | null;
  setSelectedWeekIndex: (index: number | null) => void;
  closeModal: () => void;

  // 홈 요약 데이터 상태
  homeSummaryData: ConditionHomeSummaryResult;
  setHomeSummaryData: (data: ConditionHomeSummaryResult) => void;
  markWeekCompleted: () => void;

  // 컨디션 체크 팝업 모달 전역 상태 및 입력 데이터
  isCheckModalOpen: boolean;
  checkStep: ConditionCheckStep;
  vitalityScore: number;
  sleepHours: number;
  sleepMinutes: number;

  openCheckModal: (step?: ConditionCheckStep) => void;
  closeCheckModal: () => void;
  setCheckStep: (step: ConditionCheckStep) => void;
  setVitalityScore: (score: number) => void;
  setSleepTime: (hours: number, minutes: number) => void;
  resetConditionData: () => void;
}

const DEFAULT_VITALITY_SCORE = 3;
const DEFAULT_SLEEP_HOURS = 7;
const DEFAULT_SLEEP_MINUTES = 30;

const DEFAULT_HOME_SUMMARY: ConditionHomeSummaryResult = {
  currentWeekCompleted: false,
  monthlyGraph: [],
  monthlySummary: {
    avgVitalityScore: 3.0,
    avgSleepHours: 4.5,
    intakeDays: 3,
    intakeTotalDays: 7,
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
  checkStep: 1,
  vitalityScore: DEFAULT_VITALITY_SCORE,
  sleepHours: DEFAULT_SLEEP_HOURS,
  sleepMinutes: DEFAULT_SLEEP_MINUTES,

  openCheckModal: (step = 1) =>
    set({ isCheckModalOpen: true, checkStep: step }),

  closeCheckModal: () =>
    set({
      isCheckModalOpen: false,
      checkStep: 1,
      vitalityScore: DEFAULT_VITALITY_SCORE,
      sleepHours: DEFAULT_SLEEP_HOURS,
      sleepMinutes: DEFAULT_SLEEP_MINUTES,
    }),

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

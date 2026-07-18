import { create } from 'zustand';

export type ConditionCheckStep = 1 | 2 | 3 | 4;

interface ConditionState {
  selectedWeekIndex: number | null;
  setSelectedWeekIndex: (index: number | null) => void;
  closeModal: () => void;

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

export const useConditionStore = create<ConditionState>((set) => ({
  selectedWeekIndex: null,
  setSelectedWeekIndex: (index) => set({ selectedWeekIndex: index }),
  closeModal: () => set({ selectedWeekIndex: null }),

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

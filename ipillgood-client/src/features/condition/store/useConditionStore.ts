import { create } from 'zustand';

export type ConditionCheckStep = 1 | 2 | 3 | 4;

interface ConditionState {
  selectedWeekIndex: number | null;
  setSelectedWeekIndex: (index: number | null) => void;
  closeModal: () => void;
  isCheckModalOpen: boolean;
  isSundayModalOpen: boolean;
  checkStep: ConditionCheckStep;
  vitalityScore: number;
  sleepHours: number;
  sleepMinutes: number;
  openCheckModal: (sundayIntakeWarningRequired: boolean, step?: ConditionCheckStep) => void;
  forceOpenCheckModal: (step?: ConditionCheckStep) => void;
  closeCheckModal: () => void;
  closeSundayModal: () => void;
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
  isSundayModalOpen: false,
  checkStep: 1,
  vitalityScore: DEFAULT_VITALITY_SCORE,
  sleepHours: DEFAULT_SLEEP_HOURS,
  sleepMinutes: DEFAULT_SLEEP_MINUTES,

  openCheckModal: (sundayIntakeWarningRequired, step = 1) =>
    set({
      isSundayModalOpen: sundayIntakeWarningRequired,
      isCheckModalOpen: !sundayIntakeWarningRequired,
      checkStep: step,
    }),

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

  closeSundayModal: () => set({ isSundayModalOpen: false }),
  setCheckStep: (step) => set({ checkStep: step }),
  setVitalityScore: (score) => set({ vitalityScore: score }),
  setSleepTime: (hours, minutes) => set({ sleepHours: hours, sleepMinutes: minutes }),
  resetConditionData: () =>
    set({
      vitalityScore: DEFAULT_VITALITY_SCORE,
      sleepHours: DEFAULT_SLEEP_HOURS,
      sleepMinutes: DEFAULT_SLEEP_MINUTES,
    }),
}));

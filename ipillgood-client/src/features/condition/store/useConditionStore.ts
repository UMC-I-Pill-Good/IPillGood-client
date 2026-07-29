import { create } from 'zustand';
import { type ConditionMonthlyRecordsResult, type ConditionCurrentWeekResult } from '../types/condition';

export type ConditionCheckStep = 1 | 2 | 3 | 4;

interface ConditionState {
  selectedWeekIndex: number | null;
  setSelectedWeekIndex: (index: number | null) => void;
  closeModal: () => void;

  // 홈 요약 데이터 상태 (1회만 API로 호출)
  homeSummaryData: ConditionMonthlyRecordsResult;
  setHomeSummaryData: (data: ConditionMonthlyRecordsResult) => void;

  // 이번 주 컨디션 체크 상태 (API로 호출)
  currentWeekStatus: ConditionCurrentWeekResult;
  setCurrentWeekStatus: (status: ConditionCurrentWeekResult) => void;
  markWeekCompleted: (recordId: number) => void;

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

const DEFAULT_HOME_SUMMARY: ConditionMonthlyRecordsResult = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  averageConditionScore: null,
  averageVitalityScore: null,
  averageSleepHours: null,
  averageIntakeDaysCount: null,
  records: [],
};

const DEFAULT_CURRENT_WEEK_STATUS: ConditionCurrentWeekResult = {
  today: '',
  weekStartOn: '',
  weekEndOn: '',
  isSunday: false,
  checkAvailable: false,
  checked: false,
  recordId: null,
  autoPopupAvailable: false,
  autoShownAt: null,
  dismissedAt: null,
  sundayIntakeWarningRequired: false,
};

export const useConditionStore = create<ConditionState>((set) => ({
  selectedWeekIndex: null,
  setSelectedWeekIndex: (index) => set({ selectedWeekIndex: index }),
  closeModal: () => set({ selectedWeekIndex: null }),

  homeSummaryData: DEFAULT_HOME_SUMMARY,
  setHomeSummaryData: (data) => set({ homeSummaryData: data }),

  currentWeekStatus: DEFAULT_CURRENT_WEEK_STATUS,
  setCurrentWeekStatus: (status) => set({ currentWeekStatus: status }),
  markWeekCompleted: (recordId: number) =>
    set((state) => ({
      currentWeekStatus: {
        ...state.currentWeekStatus,
        checked: true,
        recordId,
      },
    })),

  isCheckModalOpen: false,
  isSundayModalOpen: false,
  checkStep: 1,
  vitalityScore: DEFAULT_VITALITY_SCORE,
  sleepHours: DEFAULT_SLEEP_HOURS,
  sleepMinutes: DEFAULT_SLEEP_MINUTES,

  // 전역 팝업 오픈 요청 시 서버로부터 받아온 sundayIntakeWarningRequired 감지
  openCheckModal: (step = 1) => {
    set((state) => {
      const warningRequired = state.currentWeekStatus.sundayIntakeWarningRequired;
      if (warningRequired) {
        return { isSundayModalOpen: true, isCheckModalOpen: false, checkStep: step };
      } else {
        return { isSundayModalOpen: false, isCheckModalOpen: true, checkStep: step };
      }
    });
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


import { create } from 'zustand';

export type ConditionCheckStep = 1 | 2 | 3 | 4;

interface ConditionState {
  selectedWeekIndex: number | null;
  setSelectedWeekIndex: (index: number | null) => void;
  closeModal: () => void;

  // 컨디션 체크 팝업 모달 전역 상태
  isCheckModalOpen: boolean;
  checkStep: ConditionCheckStep;
  openCheckModal: (step?: ConditionCheckStep) => void;
  closeCheckModal: () => void;
  setCheckStep: (step: ConditionCheckStep) => void;
}

export const useConditionStore = create<ConditionState>((set) => ({
  selectedWeekIndex: null,
  setSelectedWeekIndex: (index) => set({ selectedWeekIndex: index }),
  closeModal: () => set({ selectedWeekIndex: null }),

  isCheckModalOpen: false,
  checkStep: 1,
  openCheckModal: (step = 1) =>
    set({ isCheckModalOpen: true, checkStep: step }),
  closeCheckModal: () => set({ isCheckModalOpen: false }),
  setCheckStep: (step) => set({ checkStep: step }),
}));

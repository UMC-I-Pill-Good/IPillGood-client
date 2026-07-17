import { create } from 'zustand';

interface ConditionState {
    selectedWeekIndex: number | null;
    setSelectedWeekIndex: (index: number | null) => void;
    closeModal: () => void;
}

export const useConditionStore = create<ConditionState>((set) => ({
    selectedWeekIndex: null,
    setSelectedWeekIndex: (index) => set({ selectedWeekIndex: index }),
    closeModal: () => set({ selectedWeekIndex: null }),
}));

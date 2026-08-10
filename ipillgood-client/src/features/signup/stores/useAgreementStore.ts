// features/signup/stores/useAgreementStore.ts
import { create } from 'zustand';

type AgreementKey = 'terms' | 'privacy' | 'health' | 'marketing';

interface AgreementState {
  checked: Record<'all' | AgreementKey, boolean>;
  toggleAll: () => void;
  toggle: (key: AgreementKey) => void;
  reset: () => void;
}

const initial = {
  all: false,
  terms: false,
  privacy: false,
  health: false,
  marketing: false,
};

export const useAgreementStore = create<AgreementState>((set, get) => ({
  checked: initial,
  toggleAll: () => {
    const next = !get().checked.all;

    set({
      checked: { all: next, terms: next, privacy: next, health: next, marketing: next },
    });
  },

  toggle: (key) => {
    const current = get().checked;
    const next = { ...current, [key]: !current[key] };

    next.all = next.terms && next.privacy && next.health && next.marketing;

    set({ checked: next });
  },
  reset: () => set({ checked: initial }),
}));

export const useIsRequiredChecked = () =>
  useAgreementStore((s) => s.checked.terms && s.checked.privacy && s.checked.health);

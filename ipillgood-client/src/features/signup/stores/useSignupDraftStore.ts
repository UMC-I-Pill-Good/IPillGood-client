import { create } from 'zustand';
import { type SignupType } from '../schemas/authSchema';

const initialSignupDraft: SignupType = {
  nickname: '',
  id: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

interface SignupDraftState {
  draft: SignupType;
  setDraft: (draft: SignupType) => void;
  resetDraft: () => void;
}

export const useSignupDraftStore = create<SignupDraftState>((set) => ({
  draft: initialSignupDraft,
  setDraft: (draft) => set({ draft }),
  resetDraft: () => set({ draft: initialSignupDraft }),
}));

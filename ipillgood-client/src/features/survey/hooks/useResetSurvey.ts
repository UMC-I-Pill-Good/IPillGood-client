import { useResetAtom } from 'jotai/utils';
import {
  genderAtom,
  birthYearAtom,
  selectedJobAtom,
  periodAtom,
  selectedDateAtom,
  lifestyleAtom,
  healthStateAtom,
  healthConcernAtom,
  currentIngredientIdsAtom,
  selectedIngredientItemsAtom,
} from '../atoms/survey.atom';

export const useResetSurvey = () => {
  const resetGender = useResetAtom(genderAtom);
  const resetBirthYear = useResetAtom(birthYearAtom);
  const resetSelectedJob = useResetAtom(selectedJobAtom);
  const resetPeriod = useResetAtom(periodAtom);
  const resetSelectedDate = useResetAtom(selectedDateAtom);
  const resetLifestyle = useResetAtom(lifestyleAtom);
  const resetHealthState = useResetAtom(healthStateAtom);
  const resetHealthConcern = useResetAtom(healthConcernAtom);
  const resetCurrentIngredientIds = useResetAtom(currentIngredientIdsAtom);
  const resetSelectedIngredientItems = useResetAtom(selectedIngredientItemsAtom);

  const resetSurvey = () => {
    resetGender();
    resetBirthYear();
    resetSelectedJob();
    resetPeriod();
    resetSelectedDate();
    resetLifestyle();
    resetHealthState();
    resetHealthConcern();
    resetCurrentIngredientIds();
    resetSelectedIngredientItems();
  };

  return { resetSurvey };
};

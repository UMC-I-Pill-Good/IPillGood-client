import { useMutation } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import {
  genderAtom,
  selectedJobAtom,
  birthYearAtom,
  periodAtom,
  selectedDateAtom,
  lifestyleAtom,
  healthStateAtom,
  healthConcernAtom,
  currentIngredientIdsAtom,
} from '../atoms/survey.atom';
import { JOB_TYPE_MAP } from '../constants/basicInfo.constants';
import { formatDateToISO } from '../utils/formatData';
import { postSurvey } from '../api/survey';
import { RequestSurveyInfo } from '../types/survey';
import { LIFESTYLE_VALUE_MAP } from '../constants/lifestyle.constants';

export const useSubmitSurvey = () => {
  // survey step 1
  const birthYear = useAtomValue(birthYearAtom);
  const gender = useAtomValue(genderAtom);
  const selectedJob = useAtomValue(selectedJobAtom);
  const period = useAtomValue(periodAtom);
  const selectedDate = useAtomValue(selectedDateAtom);

  // survey step 2
  const lifestyle = useAtomValue(lifestyleAtom);

  // survey step 3
  const healthState = useAtomValue(healthStateAtom);

  const underlyingDiseaseIds = healthState.UNDERLYING_DISEASE;
  const medicationIds = healthState.MEDICATION;
  const allergyIds = healthState.ALLERGY;

  const contraindicationIds = [...underlyingDiseaseIds, ...medicationIds, ...allergyIds];

  // survey step 4
  const onboardingConcernCodes = useAtomValue(healthConcernAtom);

  // survey step 5
  const currentIngredientIds = useAtomValue(currentIngredientIdsAtom);

  return useMutation({
    mutationFn: async () => {
      if (gender === null || selectedJob === '') {
        throw new Error('기본 정보가 입력되지 않았습니다.');
      }

      const body: RequestSurveyInfo = {
        submissionType: 'INITIAL',
        birthYear,
        gender,
        jobType: JOB_TYPE_MAP[selectedJob],

        ...(gender === 'FEMALE' && {
          menstrualCycleDays: period,
          lastPeriodStartedOn: formatDateToISO(selectedDate),
        }),

        smokingStatus: LIFESTYLE_VALUE_MAP.smoking[lifestyle.smoking],
        drinkingStatus: LIFESTYLE_VALUE_MAP.drinking[lifestyle.drinking],
        dietType: LIFESTYLE_VALUE_MAP.eating[lifestyle.eating],
        exerciseFrequency: LIFESTYLE_VALUE_MAP.workout[lifestyle.workout],

        pregnant: gender === 'FEMALE' ? lifestyle.conceive === '예' : undefined,

        underlyingDiseaseNone: underlyingDiseaseIds.length === 0,
        medicationNone: medicationIds.length === 0,
        allergyNone: allergyIds.length === 0,
        currentIngredientNone: currentIngredientIds.length === 0,

        contraindicationIds: contraindicationIds,
        onboardingConcernCodes: onboardingConcernCodes,
        currentIngredientIds: currentIngredientIds,
      };

      return postSurvey(body);
    },
  });
};

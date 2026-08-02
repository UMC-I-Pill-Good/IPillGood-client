// features/survey/hooks/useSubmitBasicInfo.ts

import { useMutation } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import {
  genderAtom,
  selectedJobAtom,
  birthYearAtom,
  periodAtom,
  selectedDateAtom,
} from '../atoms/survey.atom';
import { JOB_TYPE_MAP, JobLabel } from '../constants/basicInfo.constants';
import { formatDateToISO } from '../utils/formatData';
import { postSurvey } from '../api/survey';

export const useSubmitBasicInfo = () => {
  const gender = useAtomValue(genderAtom);
  const selectedJob = useAtomValue(selectedJobAtom);
  const birthYear = useAtomValue(birthYearAtom);
  const period = useAtomValue(periodAtom);
  const selectedDate = useAtomValue(selectedDateAtom);

  return useMutation({
    mutationFn: async () => {
      const body = {
        gender,
        birthYear,
        jobType: selectedJob !== '' ? JOB_TYPE_MAP[selectedJob as JobLabel] : null,
        period,
        lastPeriodStartedOn: formatDateToISO(selectedDate),
      };

      return postSurvey(body);
    },
  });
};

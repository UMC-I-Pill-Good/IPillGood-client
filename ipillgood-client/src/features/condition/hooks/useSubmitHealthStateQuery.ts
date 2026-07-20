import { useMutation } from '@tanstack/react-query';
import { submitHealthStateQuery } from '../api/submitHealthStateQuery';
import type { SubmitHealthStateQueryRequestType } from '../types/healthStatus';

export const useSubmitHealthStateQuery = () => {
  return useMutation({
    mutationFn: (request: SubmitHealthStateQueryRequestType) =>
      submitHealthStateQuery(request),
  });
};

import { useMutation } from '@tanstack/react-query';
import { postHealthStateQuery } from '../api/postHealthStateQuery';
import type { SubmitHealthStateQueryRequestType, SubmitHealthStateQueryResponse } from '../types/healthStatus';

export const useSubmitHealthStateQuery = () => {
  return useMutation<SubmitHealthStateQueryResponse, Error, SubmitHealthStateQueryRequestType>({
    mutationFn: (request) => postHealthStateQuery(request),
  });
};

import { axiosInstance } from '@/app/api/api';
import { RequestSurveyInfo, ResponseSurveyResult } from '../types/survey';

export const postSurvey = async (body: RequestSurveyInfo): Promise<ResponseSurveyResult> => {
  const { data } = await axiosInstance.post('/surveys/responses', body);

  return data;
};

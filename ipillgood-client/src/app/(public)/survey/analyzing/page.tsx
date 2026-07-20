import AnalyzeError from './ui/AnalyzeError';
import SurveyAnalyzePage from './ui/SurveyAnalyze';

const AnalyzePage = () => {
  // TODO: API 연동
  const isError = false;

  if (isError) {
    return <AnalyzeError />;
  }

  return <SurveyAnalyzePage />;
};

export default AnalyzePage;

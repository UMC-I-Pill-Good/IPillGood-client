import AnalyzeError from './ui/AnalyzeError';
import SurveyAnalyzePage from './ui/SurveyAnalyze';

const AnalyzePage = () => {
  // TODO: API 연동
  const isError = true;

  if (isError) {
    return <AnalyzeError />;
  }

  return <SurveyAnalyzePage />;
};

export default AnalyzePage;

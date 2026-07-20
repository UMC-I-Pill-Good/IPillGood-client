import SurveyContainer from '@/features/survey/components/SurveyContainer';
import { Suspense } from 'react';

const SurveyPage = () => {
  return (
    <Suspense fallback={null}>
      <SurveyContainer />
    </Suspense>
  );
};

export default SurveyPage;

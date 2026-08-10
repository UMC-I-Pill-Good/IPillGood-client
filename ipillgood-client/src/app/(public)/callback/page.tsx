import { Suspense } from 'react';
import CallbackLoading from './ui/CallbackLoading';
import CallbackContainer from '@/features/callback/components/CallbackContainer';

const CallbackPage = () => (
  <Suspense fallback={<CallbackLoading />}>
    <CallbackContainer />
  </Suspense>
);

export default CallbackPage;

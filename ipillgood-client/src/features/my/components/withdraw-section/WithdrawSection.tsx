'use client';

import WithdrawInfoList from './WithdrawInfoList';
import WithdrawWarning from './WithdrawWarning';
import WithdrawAction from './WithdrawAction';
import { useState } from 'react';
import WithdrawCompleteSection from './WithdrawCompleteSection';
import { Header } from '@/shared/layout';

const WithdrawSection = () => {
  const [isWithdrawn, setIsWithdrawn] = useState(false);

  if (isWithdrawn) {
    return (
      <>
        <Header title='회원 탈퇴 완료' showBackButton={false} />
        <WithdrawCompleteSection />
      </>
    );
  }

  return (
    <>
      <Header title='회원 탈퇴 확인' />
      <section className='flex flex-col pb-20 px-5 pt-6.5 flex-1'>
        <WithdrawWarning />
        <WithdrawInfoList />
        <WithdrawAction onWithdrawSuccess={() => setIsWithdrawn(true)} />
      </section>
    </>
  );
};

export default WithdrawSection;

'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/shared/layout/Header';
import { TextButton } from '@/shared/components';
import { useHealthStatusSelection } from '../../hooks/useHealthStatusSelection';

import HealthStatusHeader from './HealthStatusHeader';
import HealthSystemCardGrid from './HealthSystemCardGrid';
import HealthBodyPartButtonGroup from './HealthBodyPartButtonGroup';

const HealthStatusSelection = () => {
  const router = useRouter();

  const {
    selectedSystemKey,
    selectedBodyPartKey,
    systemList,
    selectedSystem,
    handleSystemSelect,
    handleBodyPartSelect,
    handleComplete,
    isFormValid,
    isPending,
    categoryError,
  } = useHealthStatusSelection();

  if (categoryError) {
    return (
      <div className='flex min-h-dvh w-full flex-col overflow-x-hidden bg-background'>
        <Header
          title='건강 상태'
          showBackButton
          onBack={() => router.push('/condition')}
        />

      </div>
    );
  }

  return (
    <div className='flex min-h-dvh w-full flex-col overflow-x-hidden bg-background pb-20'>
      <Header
        title='건강 상태'
        showBackButton
        onBack={() => router.push('/condition')}
      />

      <HealthStatusHeader />

      <HealthSystemCardGrid
        systemList={systemList}
        isLoading={isPending}
        selectedSystemKey={selectedSystemKey}
        onSelectSystem={handleSystemSelect}
      />

      <HealthBodyPartButtonGroup
        selectedSystem={selectedSystem}
        selectedBodyPartKey={selectedBodyPartKey}
        onSelectBodyPart={handleBodyPartSelect}
      />

      <div className='mt-auto flex w-full justify-center px-5 py-4 box-border'>
        <TextButton
          type='button'
          text='선택 완료'
          size='xl'
          disabled={!isFormValid || isPending}
          onClick={handleComplete}
          className='w-full'
        />
      </div>
    </div>
  );
};

export default HealthStatusSelection;

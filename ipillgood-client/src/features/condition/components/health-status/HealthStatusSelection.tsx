'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/shared/layout/Header';
import { FetchError, TextButton } from '@/shared/components';
import { useHealthStatusSelection } from '../../hooks/useHealthStatusSelection';

import HealthStatusHeader from './HealthStatusHeader';
import HealthSystemCardGrid from './HealthSystemCardGrid';
import HealthBodyPartButtonGroup from './HealthBodyPartButtonGroup';

/**
 * 궁금한 건강 상태 선택 화면 메인 조립 컴포넌트
 */
const HealthStatusSelection = () => {
  const router = useRouter();

  // 비즈니스 및 상태 로직 커스텀 훅
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
    refetchCategoryList,
  } = useHealthStatusSelection();

  if (categoryError) {
    return (
      <div className='flex min-h-dvh w-full flex-col overflow-x-hidden bg-background'>
        <Header
          title='건강 상태'
          showBackButton={true}
          showCloseButton={true}
          onClose={() => router.push('/condition')}
        />

        <FetchError
          description='건강 상태 분류를 불러오지 못했습니다.'
          onRetry={() => void refetchCategoryList()}
        />
      </div>
    );
  }

  return (
    <div className='flex min-h-dvh w-full flex-col overflow-x-hidden bg-background pb-20'>
      {/* 1. 공통 Header */}
      <Header
        title='건강 상태'
        showBackButton={true}
        showCloseButton={true}
        onClose={() => router.push('/condition')}
      />

      {/* 2. 상단 안내 헤더 섹션 분리 */}
      <HealthStatusHeader />

      {/* 3. 대분류 신체 계통 카드 그리드 섹션 분리 */}
      <HealthSystemCardGrid
        systemList={systemList}
        isLoading={isPending}
        selectedSystemKey={selectedSystemKey}
        onSelectSystem={handleSystemSelect}
      />

      {/* 4. 세부 부위 상세 선택 버튼 그룹 섹션 분리 */}
      <HealthBodyPartButtonGroup
        selectedSystem={selectedSystem}
        selectedBodyPartKey={selectedBodyPartKey}
        onSelectBodyPart={handleBodyPartSelect}
      />

      {/* 5. 하단 CTA '선택 완료' 영역 */}
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

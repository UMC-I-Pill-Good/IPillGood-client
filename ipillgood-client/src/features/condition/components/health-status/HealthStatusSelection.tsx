'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/shared/layout/Header';
import { TextButton, SelectionCard } from '@/shared/components';
import { clsx } from 'clsx';
import HealthMinorConcernChip from './HealthMinorConcernChip';
import { HEALTH_SYSTEM_OPTION_LIST } from '../../constants/healthStatusOptionList';
import { useHealthStatusSelection } from '../../hooks/useHealthStatusSelection';

const HealthStatusSelection = () => {
  const router = useRouter();

  // 비즈니스 및 상태 로직 커스텀 훅
  const {
    selectedSystemKey,
    selectedBodyPartKey,
    selectedSystem,
    handleSystemSelect,
    handleBodyPartSelect,
    handleComplete,
    isFormValid,
    isPending,
  } = useHealthStatusSelection();

  return (
    /* NavBar(64px)와 선택 완료 버튼 사이 16px 패딩을 확보하기 위해 총 pb-20 (80px) 적용 */
    <div className='flex min-h-dvh w-full flex-col overflow-x-hidden bg-[#F2F6FF] pb-20'>
      {/* 1. 공통 Header */}
      <Header
        title='건강 상태'
        showBackButton={true}
        showCloseButton={true}
        onClose={() => router.push('/condition')}
      />

      {/* 2. 상단 안내 영역 (Tailwind 표준 text-xl, text-sm, text-base 적용) */}
      <section className='flex w-full flex-col gap-2.5 px-5 pt-4 pb-0 box-sizing-border'>
        <div className='inline-flex items-baseline gap-1.5'>
          <h1 className='text-xl font-semibold text-black leading-tight'>
            궁금한 건강 상태 선택
          </h1>
          <span className='text-sm font-normal text-neutral-800'>
            (단일 선택)
          </span>
        </div>

        <p className='text-base font-medium text-point-900 leading-normal'>
          어떤 부위가 궁금하세요?
        </p>
      </section>

      {/* 3. 건강 고민 대분류 카드 섹션 (공통 SelectionCard 4열 Grid, Tailwind 표준 text-xs, text-sm) */}
      <section className='flex w-full justify-center px-5 py-4 box-sizing-border'>
        <div className='grid w-full max-w-[349px] grid-cols-4 gap-2'>
          {HEALTH_SYSTEM_OPTION_LIST.map((system) => {
            const isSelected = selectedSystemKey === system.key;
            // 정적 데이터의 isTwoLine 속성을 읽어 12px 2줄 내림 여부 결정
            const isTwoLine12px = Boolean(system.isTwoLine);

            return (
              <SelectionCard
                key={system.key}
                id={system.key}
                label={system.label}
                icon={system.icon}
                isSelected={isSelected}
                onClick={handleSystemSelect}
                className={clsx(
                  'w-full max-w-[81px] h-[110px] border border-white transition-all duration-200',
                  isSelected
                    ? 'bg-secondary-500! text-white! [&_span:last-child]:text-white! [&_span:last-child]:font-semibold'
                    : 'bg-white/60! text-black! [&_span:last-child]:text-black!',
                  isTwoLine12px
                    ? '[&_span:last-child]:text-xs! [&_span:last-child]:leading-[1.2] [&_span:last-child]:whitespace-pre-line! [&_span:last-child]:text-center!'
                    : '[&_span:last-child]:text-sm! [&_span:last-child]:leading-tight [&_span:last-child]:whitespace-nowrap!',
                )}
              />
            );
          })}
        </div>
      </section>

      {/* 4. 세부 부위 상세 선택 제목 및 칩 리스트 (Tailwind 표준 text-xl 적용) */}
      <section className='flex w-full flex-col px-5 pt-4 pb-0 box-sizing-border'>
        <h2 className='w-full text-xl font-semibold text-black leading-tight'>
          더 자세한 부위를 선택해 주세요.
        </h2>

        {/* 선택된 대분류의 minorConcerns 세부 신체 부위 동적 렌더링 */}
        <div className='flex w-full max-w-[353px] flex-wrap items-start content-start justify-start gap-2.5 py-4'>
          {selectedSystem ? (
            selectedSystem.bodyPartList.map((part) => (
              <HealthMinorConcernChip
                key={part.key}
                id={part.key}
                label={part.label}
                isSelected={selectedBodyPartKey === part.key}
                onClick={handleBodyPartSelect}
              />
            ))
          ) : (
            <p className='text-sm text-neutral-800 py-2'>
              상단에서 궁금한 신체 계통을 선택해 주세요.
            </p>
          )}
        </div>
      </section>

      {/* 5. 하단 CTA '선택 완료' 영역 (Tailwind 표준 h-13 적용) */}
      <div className='mt-auto flex w-full justify-center px-5 py-4 box-sizing-border'>
        <TextButton
          type='button'
          text={isPending ? '제출 중...' : '선택 완료'}
          size='lg'
          disabled={!isFormValid || isPending}
          onClick={handleComplete}
          className='h-13 w-full max-w-[353px] rounded-lg bg-primary-600 text-white shadow-[0_4px_4px_0_rgba(126,131,135,0.1)] disabled:bg-neutral-300 disabled:opacity-60'
        />
      </div>
    </div>
  );
};

export default HealthStatusSelection;

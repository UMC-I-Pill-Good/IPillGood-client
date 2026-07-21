'use client';

import { MascotHeartIcon, MascotSearchIcon } from '@/assets';
import { TextButton } from '@/shared/components';
import { clsx } from 'clsx';
import { useConditionFlow } from '../hooks/useConditionFlow';

interface ConditionStatusBannerProps {
  isCompleted?: boolean;
  onOpenConditionCheck?: () => void;
}

const ConditionStatusBanner = ({
  isCompleted: propIsCompleted,
  onOpenConditionCheck: propOnOpen,
}: ConditionStatusBannerProps = {}) => {
  const { homeSummaryData, handleOpenStartModal } = useConditionFlow();

  const isCompleted = propIsCompleted ?? homeSummaryData.currentWeekCompleted;
  const onOpenConditionCheck = propOnOpen ?? handleOpenStartModal;

  const title = isCompleted
    ? '이번 주 컨디션 체크 완료!'
    : '이번 주 컨디션 체크 미완료!';

  return (
    <section className='flex w-full flex-col items-center justify-center gap-2.5 px-5 pb-2 pt-4'>
      {isCompleted ? (
        /* 1. 체크 완료 배너 */
        <div
          className={clsx(
            'relative flex h-[77px] w-full items-center rounded-2xl bg-primary-300 py-4 pl-[68px] pr-12 text-left gap-2',
            'shadow-[0_4px_4px_0_rgba(126,131,135,0.1)]',
          )}
        >
          <div className='flex flex-1 flex-col justify-center gap-0.5 mt-[3px] min-w-0'>
            <p className='h-6 text-xl font-semibold text-primary-700 leading-none whitespace-nowrap tracking-normal'>
              {title}
            </p>
            <p className='h-[17px] text-sm font-medium text-white leading-none whitespace-nowrap tracking-normal'>
              매주 체크하고, 변화를 기록해보세요.
            </p>
          </div>

          <div className='ml-auto shrink-0 pointer-events-none flex items-center justify-center h-[89px] w-[65px]'>
            <MascotHeartIcon
              width={65}
              height={89}
              className='block h-full w-full object-contain'
            />
          </div>
        </div>
      ) : (
        /* 2. 체크 미완료 배너 (팀원 피드백대로 whitespace-nowrap 완벽 복원) */
        <div
          className={clsx(
            'relative flex h-[148px] w-full flex-col items-center justify-between rounded-2xl bg-primary-300 pt-3 pb-4 px-3 text-left shadow-[0_4px_4px_0_rgba(126,131,135,0.1)]',
          )}
        >
          {/* 상단 텍스트 및 마스코트 헤더 영역 */}
          <div className='flex w-full items-center pr-10 gap-2'>
            <div className='flex flex-1 flex-col justify-center min-w-0 ml-[58px]'>
              <p className='h-6 text-xl font-semibold text-primary-700 leading-none whitespace-nowrap tracking-normal'>
                {title}
              </p>
              <p className='text-xs font-medium leading-tight tracking-normal text-white whitespace-nowrap mt-1'>
                매주 일요일에 컨디션 체크 알림을 보내드려요!
                <br />
                매주 체크하고, 변화를 기록해 보세요.
              </p>
            </div>

            <div className='ml-auto shrink-0 pointer-events-none flex items-center justify-center h-[76px] w-[65px]'>
              <MascotSearchIcon
                width={59}
                height={76}
                className='block h-full w-full object-contain'
              />
            </div>
          </div>

          {/* 공통 TextButton */}
          <TextButton
            type='button'
            text='이번 주 컨디션 체크하러 가기'
            size='lg'
            onClick={onOpenConditionCheck}
            className='mt-1 h-10.5 w-full max-w-[264px] rounded-lg bg-primary-600 text-white text-lg font-medium shadow-[0_4px_4px_0_rgba(126,131,135,0.1)] hover:bg-primary-700'
          />
        </div>
      )}
    </section>
  );
};

export default ConditionStatusBanner;
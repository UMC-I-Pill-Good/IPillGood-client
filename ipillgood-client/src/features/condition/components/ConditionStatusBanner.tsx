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
  const { currentWeekStatus, handleOpenStartModal } = useConditionFlow();

  const isCompleted = propIsCompleted ?? currentWeekStatus.checked;
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
            'relative flex h-[77px] w-full items-center justify-center rounded-2xl bg-primary-300 py-4 px-4 text-left gap-2',
            'shadow-[0_4px_4px_0_rgba(126,131,135,0.1)]',
          )}
        >
          <div className='flex flex-row items-center gap-2 mx-auto min-w-0 shrink-0 overflow-visible'>
            <div className='flex flex-col justify-center gap-0.5 min-w-0 pl-4'>
              <p className='text-xl font-semibold text-primary-700 leading-none whitespace-nowrap tracking-normal'>
                {title}
              </p>
              <p className='text-sm font-medium text-white leading-none whitespace-nowrap tracking-normal'>
                매주 체크하고, 변화를 기록해보세요.
              </p>
            </div>

            <div className='shrink-0 pointer-events-none flex items-center justify-center h-[80px] w-[59px]'>
              <MascotHeartIcon
                width={59}
                height={80}
                className='block h-full w-full object-contain'
              />
            </div>
          </div>
        </div>
      ) : (
        /* 2. 체크 미완료 배너 */
        <div
          className={clsx(
            'relative flex h-[148px] w-full flex-col items-center justify-between rounded-2xl bg-primary-300 pt-3.5 pb-4 px-4 text-left shadow-[0_4px_4px_0_rgba(126,131,135,0.1)]',
          )}
        >
          <div className='flex flex-row items-center justify-center gap-2 mx-auto min-w-0 shrink-0 w-full'>
            <div className='flex flex-col justify-center min-w-0 pl-4'>
              <p className='text-xl font-semibold text-primary-700 leading-none whitespace-nowrap tracking-normal'>
                {title}
              </p>
              <p className='text-xs font-medium leading-tight tracking-normal text-white mt-1 whitespace-nowrap'>
                매주 일요일에 컨디션 체크 알림을 보내드려요!
                <br />
                매주 체크하고, 변화를 기록해 보세요.
              </p>
            </div>

            <div className='shrink-0 pointer-events-none flex items-center justify-center h-[76px] w-[59px]'>
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
            className='mx-auto mt-1 h-10.5 w-full max-w-[290px] rounded-lg bg-primary-600 text-white text-base font-medium shadow-[0_4px_4px_0_rgba(126,131,135,0.1)] hover:bg-primary-700 transition-all'
          />
        </div>
      )}
    </section>
  );
};

export default ConditionStatusBanner;
'use client';

import { MascotHeartIcon, MascotSearchIcon } from '@/assets';
import { TextButton } from '@/shared/components';
import { clsx } from 'clsx';
import { useConditionContext } from './ConditionProvider';

interface ConditionStatusBannerProps {
  isCompleted?: boolean;
  onOpenConditionCheck?: () => void;
}

const ConditionStatusBanner = ({
  isCompleted: propIsCompleted,
  onOpenConditionCheck: propOnOpen,
}: ConditionStatusBannerProps = {}) => {
  const { currentWeekStatus, handleOpenStartModal } = useConditionContext();

  const isCompleted = propIsCompleted ?? currentWeekStatus.checked;
  const onOpenConditionCheck = propOnOpen ?? handleOpenStartModal;

  const title = isCompleted ? '이번 주 컨디션 체크 완료!' : '이번 주 컨디션 체크 미완료!';

  return (
    <section className='flex w-full flex-col items-center justify-center gap-2.5 px-5 pb-2 pt-4'>
      {isCompleted ? (
        <div
          className={clsx(
            'relative flex h-[77px] w-full items-center justify-center rounded-2xl bg-primary-300 py-4 px-4 text-left gap-2',
            'shadow-[0_4px_4px_0_rgba(126,131,135,0.1)]',
          )}
        >
          <div className='flex flex-row items-center gap-2 mx-auto min-w-0 shrink-0 overflow-visible pl-6'>
            <div className='flex min-w-0 translate-y-0.5 flex-col justify-center gap-0.5 pt-1'>
              <p className='typo-title-gosanja whitespace-nowrap text-xl font-normal not-italic leading-none tracking-normal text-primary-700'>
                {title}
              </p>
              <p className='text-sm font-medium text-white leading-normal tracking-normal'>
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
        <div
          className={clsx(
            'relative flex w-full flex-col items-center rounded-2xl bg-primary-300 px-4 text-left shadow-[0_4px_4px_0_rgba(126,131,135,0.1)]',
            currentWeekStatus.checkAvailable
              ? 'justify-between pb-4 pt-3'
              : 'h-[77px] justify-center py-4',
          )}
        >
          <div className='mx-auto flex w-full min-w-0 shrink-0 flex-row items-center justify-center gap-1 pl-0 min-[400px]:gap-2 min-[400px]:pl-6'>
            <div className='flex min-w-0 translate-y-0.5 flex-col justify-center gap-1'>
              <p className='typo-title-gosanja whitespace-nowrap text-xl font-normal not-italic leading-none tracking-normal text-primary-700'>
                {title}
              </p>
              <p className='whitespace-nowrap text-xs font-medium leading-tight tracking-normal text-white'>
                매주 일요일에 컨디션 체크 알림을 보내드려요!
                <br />
                매주 체크하고, 변화를 기록해 보세요.
              </p>
            </div>

            <div className='pointer-events-none flex h-[76px] w-[59px] shrink-0 translate-x-4 items-center justify-center min-[375px]:translate-x-0'>
              <MascotSearchIcon
                width={59}
                height={76}
                className='block h-full w-full object-contain'
              />
            </div>
          </div>

          {currentWeekStatus.checkAvailable && (
            <TextButton
              type='button'
              text='이번 주 컨디션 체크하러 가기'
              size='lg'
              onClick={onOpenConditionCheck}
              className='mx-auto h-10.5 w-full max-w-[290px] rounded-lg bg-primary-600 text-base font-medium text-white shadow-[0_4px_4px_0_rgba(126,131,135,0.1)] transition-all hover:bg-primary-700'
            />
          )}
        </div>
      )}
    </section>
  );
};

export default ConditionStatusBanner;

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
            'relative flex h-[77px] w-full items-center rounded-[20px] bg-primary-300 py-4 pl-[68px] pr-12 text-left gap-2',
            'shadow-[0_4px_4px_0_rgba(126,131,135,0.1)]',
          )}
        >
          <div className='flex flex-1 flex-col justify-center gap-0.5 mt-[3px] min-w-0'>
            <p className='h-6 text-[20px] font-semibold text-primary-700 leading-none whitespace-nowrap tracking-normal'>
              {title}
            </p>
            <p className='h-[17px] text-[14px] font-medium text-white leading-none whitespace-nowrap tracking-normal'>
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
        /* 2. 체크 미완료 배너 (시맨틱 색상 토큰 적용) */
        <div
          className={clsx(
            'relative flex w-full flex-col items-center rounded-[20px] bg-primary-300 pt-2 pb-3.5 px-3 text-left shadow-[0_4px_4px_0_rgba(126,131,135,0.1)]',
          )}
        >
          {/* 상단 텍스트 및 마스코트 헤더 영역 */}
          <div className='flex w-full items-center pr-10 gap-2'>
            <div className='flex flex-1 flex-col justify-center min-w-0 ml-[58px]'>
              <p className='h-6 text-[20px] font-semibold text-primary-700 leading-none whitespace-nowrap tracking-normal'>
                {title}
              </p>
              <p className='text-[12px] font-medium leading-tight tracking-normal text-white whitespace-nowrap mt-0.5'>
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

          {/* 시맨틱 색상 토큰 (bg-primary-600, hover:bg-primary-700) 적용 공통 TextButton */}
          <TextButton
            type='button'
            text='이번 주 컨디션 체크하러 가기'
            size='lg'
            onClick={onOpenConditionCheck}
            className='mt-1 h-[42px] w-full max-w-[264px] rounded-lg bg-primary-600 text-white text-[18px] font-medium shadow-[0_4px_4px_0_rgba(126,131,135,0.1)] hover:bg-primary-700'
          />
        </div>
      )}
    </section>
  );
};

export default ConditionStatusBanner;
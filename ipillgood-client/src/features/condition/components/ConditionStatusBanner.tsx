'use client';

import { MascotHeartIcon, MascotSearchIcon } from '@/assets';
import { cn } from '@/shared/utils/cn';

interface ConditionStatusBannerProps {
    isCompleted?: boolean;
    onOpenConditionCheck?: () => void;
}

const ConditionStatusBanner = ({
    isCompleted = true,
    onOpenConditionCheck,
}: ConditionStatusBannerProps) => {
    const title = isCompleted
        ? '이번 주 컨디션 체크 완료!'
        : '이번 주 컨디션 체크 미완료!';

    const bannerContent = (
        <>
            <div
                className={cn(
                    'absolute left-[76px] top-1/2 z-10 flex -translate-y-1/2 flex-col gap-1 mt-1',
                    isCompleted
                        ? 'h-[42px] w-[212px]'
                        : 'h-[56px] w-[216px]',
                )}
            >
                <p
                    className={cn(
                        'typo-body-1 h-6 whitespace-nowrap tracking-normal text-[#6580EE]',
                        isCompleted ? 'w-[212px]' : 'w-[216px]',
                    )}
                >
                    {title}
                </p>

                {isCompleted ? (
                    <p className='h-[17px] w-[212px] whitespace-nowrap text-[14px] font-medium leading-[17px] tracking-normal text-white'>
                        매주 체크하고, 변화를 기록해보세요.
                    </p>
                ) : (
                    <p className='h-7 w-[216px] whitespace-nowrap text-[12px] font-medium leading-none tracking-normal text-white'>
                        매주 일요일에 컨디션 체크 알림을 보내드려요!
                        <br />
                        매주 체크하고, 변화를 기록해 보세요.
                    </p>
                )}
            </div>

            <div
                className={cn(
                    'pointer-events-none absolute top-1/2 z-10 shrink-0',
                    isCompleted
                        ? 'right-[56px] h-[83px] w-[60px] -translate-y-[48%]'
                        : 'right-[40px] h-[72.07px] w-[55px] -translate-y-1/2',
                )}
            >
                {isCompleted ? (
                    <MascotHeartIcon className='block h-full w-full object-contain' />
                ) : (
                    <MascotSearchIcon className='block h-full w-full object-contain' />
                )}
            </div>
        </>
    );

    const bannerClassName = cn(
        'relative h-[77px] w-full overflow-visible rounded-[20px] bg-[#C4D0FF] text-left',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-2px_5px_rgba(126,131,135,0.07),0_4px_4px_0_rgba(126,131,135,0.1)]',
    );

    return (
        <section className='flex h-[101px] w-full flex-col gap-2.5 px-5 pb-2 pt-4'>
            {isCompleted ? (
                <div className={bannerClassName}>{bannerContent}</div>
            ) : (
                <button
                    type='button'
                    aria-label='이번 주 컨디션 체크 시작하기'
                    className={cn(
                        bannerClassName,
                        'cursor-pointer transition-opacity hover:opacity-95 active:opacity-90',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
                    )}
                    onClick={onOpenConditionCheck}
                >
                    {bannerContent}
                </button>
            )}
        </section>
    );
};

export default ConditionStatusBanner;
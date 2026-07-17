'use client';

import { MascotHeartIcon, MascotSearchIcon } from '@/assets';
import { clsx } from 'clsx';

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

    const Tag = isCompleted ? 'div' : 'button';

    const bannerClassName = clsx(
        'relative flex h-[77px] w-full items-center rounded-[20px] bg-[#C4D0FF] py-4 pl-[60px] pr-5 text-left',
        'shadow-[0_4px_4px_0_rgba(126,131,135,0.1)]',
    );

    return (
        <section className='flex w-full flex-col items-center justify-center gap-2.5 px-5 pb-2 pt-4'>
            <Tag
                {...(!isCompleted && {
                    type: 'button',
                    'aria-label': '이번 주 컨디션 체크 시작하기',
                    onClick: onOpenConditionCheck,
                })}
                className={clsx(
                    bannerClassName,
                    !isCompleted && 'cursor-pointer transition-opacity hover:opacity-95 active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
                )}
            >
                <div className='flex h-[45px] w-[212px] flex-col gap-1 justify-center'>
                    <p
                        className={clsx(
                            'h-6 w-[212px] text-[20px] font-semibold text-[#6580EE] leading-none whitespace-nowrap tracking-normal',
                        )}
                    >
                        {title}
                    </p>

                    {isCompleted ? (
                        <p className='h-[17px] w-[212px] text-[14px] font-medium text-white leading-none whitespace-nowrap tracking-normal'>
                            매주 체크하고, 변화를 기록해보세요.
                        </p>
                    ) : (
                        <p className='w-[212px] text-[12px] font-medium leading-tight tracking-normal text-white'>
                            매주 일요일에 컨디션 체크 알림을 보내드려요!
                            <br />
                            매주 체크하고, 변화를 기록해 보세요.
                        </p>
                    )}
                </div>

                <div
                    className={clsx(
                        'ml-auto shrink-0 pointer-events-none',
                        isCompleted
                            ? 'h-[83px] w-[60px]'
                            : 'h-[72px] w-[55px]',
                    )}
                >
                    {isCompleted ? (
                        <MascotHeartIcon
                            width={60}
                            height={83}
                            className='block h-full w-full object-contain'
                        />
                    ) : (
                        <MascotSearchIcon
                            width={55}
                            height={72}
                            className='block h-full w-full object-contain'
                        />
                    )}
                </div>
            </Tag>
        </section>
    );
};

export default ConditionStatusBanner;
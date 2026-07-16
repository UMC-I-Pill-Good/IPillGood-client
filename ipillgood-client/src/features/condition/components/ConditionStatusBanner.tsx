interface ConditionStatusBannerProps {
    isCompleted?: boolean;
}

const ConditionStatusBanner = ({
    isCompleted = true,
}: ConditionStatusBannerProps) => {
    const statusText = isCompleted
        ? '이번 주 컨디션 체크 완료!'
        : '이번 주 컨디션 체크 미완료!';

    return (
        <section className='flex h-[101px] w-full flex-col gap-2.5 px-5 pb-2 pt-4'>
            <div className='relative flex h-[77px] w-full items-center justify-between gap-0 
            overflow-visible rounded-[20px] bg-primary-200 py-4 pl-[76px] pr-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.3),
            inset_0_-2px_5px_rgba(126,131,135,0.07),0_4px_4px_0_rgba(126,131,135,0.1)]'>
                <div className='relative z-10 flex h-[42px] w-[212px] shrink-0 translate-y-0.5 flex-col'>
                    <p className='typo-body-1 h-6 w-[212px] whitespace-nowrap tracking-normal text-primary-500'>
                        {statusText}
                    </p>

                    <p className='typo-caption-6 h-3.5 w-[212px] whitespace-nowrap tracking-normal text-white'>
                        매주 체크하고, 변화를 기록해보세요.
                    </p>
                </div>

                <div className='pointer-events-none relative z-10 h-[70px] w-[54px] shrink-0 -translate-x-1'>
                    <img
                        src='/icons/mascot-default.svg'
                        alt=''
                        aria-hidden='true'
                        draggable={false}
                        className='block h-full w-full origin-center rotate-[2deg] object-contain drop-shadow-[0_4px_10px_rgba(126,131,135,0.2)]'
                    />
                </div>
            </div>
        </section>
    );
};

export default ConditionStatusBanner;
import Link from 'next/link';
import { cn } from '@/shared/utils/cn';

interface ConditionHealthStatusSectionProps {
    href?: string;
}

const ConditionHealthStatusSection = ({
    href = '/condition/health-status',
}: ConditionHealthStatusSectionProps) => {
    return (
        <section className='flex w-full flex-col px-5 py-4'>
            <div
                className={cn(
                    'flex h-[113px] w-full flex-col items-center gap-3 overflow-hidden rounded-[20px] p-3',
                    'border border-white/70 bg-primary-600/20',
                    'backdrop-blur-xl backdrop-saturate-150',
                    'shadow-[inset_0_1px_1px_rgba(255,255,255,0.75),inset_0_-1px_2px_rgba(255,255,255,0.2),0_4px_4px_rgba(126,131,135,0.1)]',
                )}
            >
                <div className='flex h-[37px] w-full flex-col items-center gap-1'>
                    <h2 className='typo-body-9 flex h-[19px] w-full items-center justify-center text-center text-[#111111]'>
                        궁금한 건강 상태가 있으신가요?
                    </h2>

                    <p className='typo-caption-7 flex h-3.5 w-full items-center justify-center whitespace-nowrap text-center text-neutral-800'>
                        신체 부위와 관련 상태를 선택하면 맞춤 정보를
                        드려요.
                    </p>
                </div>

                <Link
                    href={href}
                    className={cn(
                        'flex h-10 w-[254px] items-center justify-center rounded-lg px-2 py-1',
                        'bg-primary-500 typo-body-6 text-center text-white',
                        'shadow-[0_4px_4px_rgba(126,131,135,0.1)]',
                        'transition-opacity hover:opacity-90 active:opacity-80',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
                    )}
                >
                    건강 상태 선택하기
                </Link>
            </div>
        </section>
    );
};

export default ConditionHealthStatusSection;
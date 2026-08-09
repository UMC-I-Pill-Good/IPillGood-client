'use client';

import { useRouter } from 'next/navigation';
import { TextButton } from '@/shared/components';
import { clsx } from 'clsx';

const ConditionHealthStatusSection = () => {
    const router = useRouter();

    return (
        <section className='flex w-full flex-col px-5 py-4'>
            <div
                className={clsx(
                    'glass !h-auto !w-full !flex !flex-col items-center justify-center gap-3 overflow-hidden rounded-[20px] p-3',
                    '!bg-primary-600/35',
                    'shadow-[0_4px_4px_0_rgba(126,131,135,0.1)]',
                )}
            >
                <div className='flex w-full flex-col items-center gap-1'>
                    <h2 className='typo-body-9 w-full text-center text-black'>
                        궁금한 건강 상태가 있으신가요?
                    </h2>

                    <p className='typo-caption-7 w-full whitespace-nowrap text-center text-neutral-800'>
                        신체 부위와 관련 상태를 선택하면 맞춤 정보를
                        드려요.
                    </p>
                </div>

                <TextButton
                    type='button'
                    text='건강 상태 선택하기'
                    size='lg'
                    className='w-full max-w-[254px] rounded-lg bg-primary-600 shadow-[0_4px_4px_0_rgba(126,131,135,0.1)]'
                    onClick={() => router.push('/condition/health-status')}
                />
            </div>
        </section>
    );
};

export default ConditionHealthStatusSection;

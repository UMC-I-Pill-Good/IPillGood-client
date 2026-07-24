'use client';

import { TextButton } from '@/shared/components';
import { useRouter } from 'next/navigation';

const AddButtonSection = () => {
  const router = useRouter();

  return (
    <section className='mt-auto px-5 pt-4'>
      <TextButton
        type='button'
        text='저장하기'
        size='xl'
        className='w-full'
        onClick={() => router.replace('/cabinet')}
      />
    </section>
  );
};

export default AddButtonSection;

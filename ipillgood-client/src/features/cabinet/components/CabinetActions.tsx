'use client';

import { TextButton } from '@/shared/components';
import { useRouter } from 'next/navigation';

const CabinetActions = () => {
  const router = useRouter();

  return (
    <>
      <p className='typo-body-10 px-5 py-4'>
        <span className='text-[#6580EE] typo-body-1'>누누님</span>이 소유 중인 영양제를 한 눈에
        확인해 보세요!
      </p>
      <div className='flex items-center justify-end gap-1 px-5 pb-4'>
        <TextButton
          type='button'
          text='섭취 중인 영양제 추가'
          size='sm'
          className='px-3'
          onClick={() => router.push('/cabinet/cabinet-add')}
        />
        <TextButton
          type='button'
          text='영양제 삭제'
          variant='outline'
          size='sm'
          className='px-3'
          onClick={() => router.push('/cabinet/cabinet-delete')}
        />
      </div>
    </>
  );
};

export default CabinetActions;

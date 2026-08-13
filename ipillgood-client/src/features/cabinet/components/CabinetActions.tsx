'use client';

import { TextButton } from '@/shared/components';
import { useRouter } from 'next/navigation';
import { useCabinetProductsQuery } from '../hooks';
import { MascotSadSmallIcon } from '@/assets';

const CabinetActions = () => {
  const router = useRouter();

  const { data, isPending, isError } = useCabinetProductsQuery();

  return (
    <>
      {!isPending && !isError && (
        <>
          <p className='typo-body-10 px-5 py-4 break-keep'>
            <span className='typo-body-1 text-primary-700'>{data?.result.memberNickname}님</span>이
            소유 중인 영양제를 한 눈에 확인해 보세요!
          </p>

          {data?.result.products.length ? (
            <section className='flex items-center justify-end gap-1 px-5 pb-4'>
              <TextButton
                type='button'
                text='영양제 삭제'
                variant='outline'
                size='sm'
                className='px-3'
                onClick={() => router.push('/cabinet/supplement-delete')}
              />
            </section>
          ) : (
            <section className='flex justify-center gap-1.5 pb-1'>
              <div className='drop-shadow-[4px_4px_12px_rgba(126,131,135,0.2)]'>
                <MascotSadSmallIcon />
              </div>

              <p className='typo-body-10 mt-10 text-primary-700'>아직 등록된 영양제가 없어요...</p>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default CabinetActions;

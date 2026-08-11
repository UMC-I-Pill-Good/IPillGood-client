'use client';

import { useAddCabinetProductsMutation } from '@/features/cabinet/hooks/useAddCabinetProductsMutation';
import { TextButton } from '@/shared/components';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { memo } from 'react';

interface SupplementAddSectionProps {
  selectedIds: number[];
}

const SupplementAddSection = ({ selectedIds }: SupplementAddSectionProps) => {
  const router = useRouter();
  const addProductsMutation = useAddCabinetProductsMutation();

  return (
    <section className='shrink-0 px-5 pb-28 pt-4'>
      <TextButton
        type='button'
        text='캐비닛에 추가하기'
        size='xl'
        className='w-full'
        disabled={selectedIds.length === 0 || addProductsMutation.isPending}
        onClick={() =>
          addProductsMutation.mutate(selectedIds, {
            onSuccess: () => router.push('/cabinet'),
            onError: (error) => {
              const message = isAxiosError<{ message?: string }>(error)
                ? error.response?.data.message
                : error instanceof Error
                  ? error.message
                  : undefined;

              alert(message ?? '캐비닛에 영양제를 추가하지 못했어요.');
            },
          })
        }
      />
    </section>
  );
};

export default memo(SupplementAddSection);

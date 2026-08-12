'use client';

import { useAddCabinetProductsMutation } from '@/features/cabinet/hooks/useAddCabinetProductsMutation';
import { TextButton } from '@/shared/components';
import { showToast } from '@/shared/utils';
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
            onSuccess: () => {
              showToast.success('캐비닛에 추가됐어요!');
              router.push('/cabinet');
            },
            onError: () => showToast.error('추가에 실패했어요. 다시 시도해 주세요.'),
          })
        }
      />
    </section>
  );
};

export default memo(SupplementAddSection);

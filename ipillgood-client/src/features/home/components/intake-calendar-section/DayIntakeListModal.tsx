'use client';

import { ModalShell, TextButton } from '@/shared/components';
import CheckboxList from '../CheckboxList';
import { useQuery } from '@tanstack/react-query';
import { getIntakeDays } from '../../api/intake';
import { Loader2 } from 'lucide-react';

interface DayIntakeListModalProps {
  date: string;
  onClose: () => void;
}

const DayIntakeListModal = ({ date, onClose }: DayIntakeListModalProps) => {
  const { data, isPending } = useQuery({
    queryKey: ['intakeDays', date],
    queryFn: () => getIntakeDays(date),
    select: (res) => res.result,
    staleTime: 1000 * 60 * 5,
  });

  const products = data?.products ?? [];
  const [, month, day] = date.split('-');

  return (
    <ModalShell
      onClose={onClose}
      className='max-h-[80dvh] gap-4.75 pt-4 overflow-hidden!'
      ariaLabel={`${Number(month)}월 ${Number(day)}일 섭취한 영양제 목록`}
    >
      <p className='mt-2 shrink-0 text-center typo-body-5 text-black'>
        {Number(month)}월 {Number(day)}일 섭취한 영양제 목록
      </p>
      {isPending ? (
        <div className='flex min-h-0 flex-1 items-center justify-center'>
          <Loader2 className='text-primary-600 size-6 animate-spin' />
        </div>
      ) : (
        <>
          <div className='min-h-0 flex-1 overflow-y-auto overscroll-contain thin-scrollbar'>
          <CheckboxList
            list={products.map((product) => ({
              id: product.activeProductId,
              label: product.productName,
            }))}
            checkedIdList={products.map((p) => p.activeProductId)}
            onToggle={() => {}}
            readOnly
          />
          </div>
          <TextButton
            size='lg'
            type='button'
            className='mt-4.75 w-full shrink-0'
            onClick={onClose}
            text='닫기'
          />
        </>
      )}
    </ModalShell>
  );
};

export default DayIntakeListModal;

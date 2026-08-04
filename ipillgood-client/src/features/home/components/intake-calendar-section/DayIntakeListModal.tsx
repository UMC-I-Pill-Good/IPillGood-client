'use client';

import { ModalShell } from '@/shared/components';
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
      className='gap-5'
      ariaLabel={`${Number(month)}/${Number(day)} 섭취한 영양제 목록`}
    >
      <p className='typo-body-5 text-[#111] text-center'>
        {Number(month)}/{Number(day)} 섭취한 영양제 목록
      </p>
      {isPending ? (
        <div className='flex h-20 items-center justify-center'>
          <Loader2 className='text-primary-600 size-6 animate-spin' />
        </div>
      ) : (
        <CheckboxList
          list={products.map((product) => ({
            id: product.activeProductId,
            label: product.productName,
          }))}
          checkedIdList={products.map((p) => p.activeProductId)}
          onToggle={() => {}}
          readOnly
        />
      )}
    </ModalShell>
  );
};

export default DayIntakeListModal;

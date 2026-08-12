'use client';

import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { DetailCabinetIcon } from '@/assets';
import { useAddCabinetProductsMutation } from '@/features/cabinet/hooks/useAddCabinetProductsMutation';
import { TextButton } from '@/shared/components';
import { showToast } from '@/shared/utils';

import { rankingQueryKeys } from '../../constants/rankingQueryKeys';

interface ProductCabinetAddSectionProps {
  productId: number;
}

const ProductCabinetAddSection = ({ productId }: ProductCabinetAddSectionProps) => {
  const queryClient = useQueryClient();
  const addProductMutation = useAddCabinetProductsMutation();

  if (addProductMutation.isSuccess) return null;

  const handleAddProduct = () => {
    addProductMutation.mutate([productId], {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: rankingQueryKeys.productDetail(productId) });
        showToast.success('캐비닛에 영양제가 추가됐어요!');
      },
      onError: (error) => {
        const message = isAxiosError<{ message?: string }>(error)
          ? error.response?.data.message
          : error instanceof Error
            ? error.message
            : undefined;

        showToast.error(message ?? '캐비닛에 영양제를 추가하지 못했어요.');
      },
    });
  };

  return (
    <section className='w-full'>
      <div className='flex aspect-[353/99] min-h-[99px] w-full flex-col items-center justify-center gap-2 rounded-[20px] bg-white p-3 shadow-[0_4px_2px_rgba(126,131,135,0.1)]'>
        <div className='flex w-[77%] items-center gap-2 text-neutral-800'>
          <span className='flex size-[25px] shrink-0 items-center justify-center rounded-full bg-secondary-200 text-secondary-600'>
            <DetailCabinetIcon aria-hidden='true' className='size-[11px]' />
          </span>
          <p className='w-[179px] shrink-0 typo-caption-6 leading-3 not-italic text-neutral'>
            해당 영양제를 이미 드시고 계신가요? 그렇다면 캐비닛에 추가해 보세요!
          </p>
        </div>
        <TextButton
          type='button'
          text='캐비닛에 추가하기'
          variant='primary'
          size='lg'
          className='h-10 w-[77%] rounded-lg px-2 text-[18px] font-medium leading-normal shadow-[0_4px_2px_rgba(126,131,135,0.1)]'
          disabled={addProductMutation.isPending}
          onClick={handleAddProduct}
        />
      </div>
    </section>
  );
};

export default ProductCabinetAddSection;

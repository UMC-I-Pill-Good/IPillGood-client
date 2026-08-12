'use client';

import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

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
    <section className='flex w-full flex-col gap-2 px-5 pb-6'>
      <p className='text-center typo-caption-6 leading-none text-neutral'>
        해당 영양제를 이미 드시고 계신가요?
        <br />
        그렇다면 캐비닛에 추가해 보세요!
      </p>
      <TextButton
        type='button'
        text='캐비닛에 추가하기'
        variant='outline'
        size='xl'
        className='w-full rounded-lg border-secondary-600 bg-transparent text-secondary-700'
        disabled={addProductMutation.isPending}
        onClick={handleAddProduct}
      />
    </section>
  );
};

export default ProductCabinetAddSection;

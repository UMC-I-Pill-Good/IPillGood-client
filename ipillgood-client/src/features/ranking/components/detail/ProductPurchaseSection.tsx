'use client';

import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { TextButton } from '@/shared/components';
import { TOAST_MESSAGES } from '@/shared/constants/toastMessages';
import { showToast } from '@/shared/utils/toast';

import { getCautionCombinations } from '../../api/getCautionCombinations';
import PurchaseInteractionWarningModal from './PurchaseInteractionWarningModal';

interface ProductPurchaseSectionProps {
  productId: number;
}

const ProductPurchaseSection = ({ productId }: ProductPurchaseSectionProps) => {
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const openedPurchaseProductIdRef = useRef<number | null>(null);
  const purchaseCheckQuery = useQuery({
    queryKey: ['product-purchase-check', productId],
    queryFn: async () => {
      const response = await getCautionCombinations(productId);

      if (!response.isSuccess || !response.result) {
        throw new Error(response.message || '구매 전 주의 조합을 확인하지 못했습니다.');
      }

      return response.result;
    },
  });
  const purchaseCheck = purchaseCheckQuery.data;

  const openPurchasePage = (purchaseUrl: string) => {
    if (openedPurchaseProductIdRef.current === productId) return 'alreadyOpened' as const;

    const purchaseWindow = window.open('about:blank', '_blank');
    if (!purchaseWindow) return 'blocked' as const;

    purchaseWindow.opener = null;
    purchaseWindow.location.replace(purchaseUrl);
    openedPurchaseProductIdRef.current = productId;

    return 'opened' as const;
  };

  const handlePurchaseClick = () => {
    if (!purchaseCheck) {
      showToast.error('구매 전 주의 조합을 확인하지 못했습니다.');
      return;
    }

    if (!purchaseCheck.hasConflict) {
      openPurchasePage(purchaseCheck.purchaseUrl);
      return;
    }

    if (purchaseCheck.conflicts.length === 0) {
      showToast.error('병용 주의 조합 정보를 불러오지 못했습니다.');
      return;
    }

    setIsWarningModalOpen(true);
  };

  const handlePurchaseConfirm = () => {
    if (!purchaseCheck) return;

    const purchasePageResult = openPurchasePage(purchaseCheck.purchaseUrl);
    if (purchasePageResult === 'blocked') return;

    setIsWarningModalOpen(false);
    if (purchasePageResult === 'opened') {
      showToast.success(TOAST_MESSAGES.CART_ADDED);
    }
  };

  return (
    <>
      <section className='flex w-full flex-col gap-2 px-5 py-4'>
        <p className='text-center typo-caption-6 text-neutral-800'>
          질병 치료 및 의약품을 복용 중이라면 의사 상담 후 섭취를 추천드려요.
        </p>
        <TextButton
          type='button'
          text='구매하러 가기'
          size='xl'
          onClick={handlePurchaseClick}
          disabled={purchaseCheckQuery.isPending}
          className='h-13 w-full rounded-lg px-2 typo-body-2'
        />
      </section>

      {isWarningModalOpen && purchaseCheck && (
        <PurchaseInteractionWarningModal
          conflictList={purchaseCheck.conflicts}
          onCancel={() => setIsWarningModalOpen(false)}
          onConfirm={handlePurchaseConfirm}
        />
      )}
    </>
  );
};

export default ProductPurchaseSection;

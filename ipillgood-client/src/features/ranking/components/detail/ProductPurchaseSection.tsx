'use client';

import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { DetailInfoIcon } from '@/assets';
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
      const purchasePageResult = openPurchasePage(purchaseCheck.purchaseUrl);
      if (purchasePageResult === 'opened') {
        showToast.success(TOAST_MESSAGES.CART_ADDED);
      }
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
      <section className='w-full'>
        <div className='flex aspect-[353/99] min-h-[99px] w-full flex-col items-center justify-center gap-2 rounded-[20px] bg-white p-3 shadow-[0_4px_2px_rgba(126,131,135,0.1)]'>
          <div className='flex w-full max-w-[253px] items-center gap-2 text-neutral-800'>
            <span className='flex size-[25px] shrink-0 items-center justify-center rounded-full bg-primary-200 text-primary-600'>
              <DetailInfoIcon aria-hidden='true' className='h-[15px] w-1' />
            </span>
            <p className='w-[179px] shrink-0 typo-caption-6 leading-[12.5px] not-italic text-neutral'>
              질병 치료 및 의약품을 복용 중이라면
              <br />
              의사 상담 후 섭취를 추천드려요.
            </p>
          </div>
          <TextButton
            type='button'
            text='구매하러 가기'
            size='lg'
            onClick={handlePurchaseClick}
            disabled={purchaseCheckQuery.isPending}
            className='h-10 w-[77%] rounded-lg px-2 text-[18px] font-medium leading-normal shadow-[0_4px_2px_rgba(126,131,135,0.1)]'
          />
        </div>
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

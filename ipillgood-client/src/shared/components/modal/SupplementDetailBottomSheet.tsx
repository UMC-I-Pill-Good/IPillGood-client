'use client';

import { BottomSheet, TextButton, ToggleButton } from '@/shared/components';
import Image from 'next/image';
import { BellIcon, TimerOffIcon } from '@/assets';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { IntakeCycleModal, IntakeTimeModal } from '@/shared/components';
import { useQuery } from '@tanstack/react-query';
import { getCabinetProductsDetail } from '@/features/cabinet/api/cabinet';
import { usePatchIntakeProductMutation } from '@/features/cabinet/hooks';
import { frequencyCycle } from '@/features/cabinet/constants/intake.constants';
import { useRouter } from 'next/navigation';

interface SupplementDetailBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberProductId: number | null;
}

const SupplementDetailBottomSheet = ({
  open,
  onOpenChange,
  memberProductId,
}: SupplementDetailBottomSheetProps) => {
  const router = useRouter();
  const [isOpenIntakeCycleModal, setIsOpenIntakeCycleModal] = useState(false);
  const [isOpenIntakeTimeModal, setIsOpenIntakeTimeModal] = useState(false);

  const { data } = useQuery({
    queryKey: ['cabinetProductDetail', memberProductId],
    queryFn: () => getCabinetProductsDetail(memberProductId!),
    enabled: open && memberProductId !== null,
  });
  const patchActiveProductMutation = usePatchIntakeProductMutation();

  if (!data?.result) return null;

  const activeProduct = data.result.activeProduct;
  const notificationEnabled = activeProduct?.notificationEnabled ?? false;
  const intakeHour = activeProduct ? Number(activeProduct.intakeTime.split(':')[0]) : null;
  const intakeTimeLabel = activeProduct
    ? `${intakeHour !== null && intakeHour >= 12 ? '오후' : '오전'} ${activeProduct.intakeTime}`
    : '';

  const updateActiveProduct = (body: {
    intakeTime?: string;
    frequency?: string;
    notificationEnabled?: boolean;
  }) => {
    if (!activeProduct) return;

    patchActiveProductMutation.mutate({
      activeProductId: activeProduct.activeProductId,
      body: {
        intakeTime: body.intakeTime ?? activeProduct.intakeTime,
        frequency: body.frequency ?? activeProduct.frequency,
        notificationEnabled: body.notificationEnabled ?? notificationEnabled,
      },
    });
  };

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <div className='flex flex-col'>
        <section className='py-4 space-y-3 flex flex-col items-center justify-center'>
          <div className='flex items-center justify-center bg-white rounded-lg w-45 h-45'>
            <Image
              src={data.result.thumbnailImageUrl}
              alt={data.result.productName}
              width={110}
              height={110}
              className='h-27.5 w-20 shrink-0'
            />
          </div>
          <article className='text-center space-y-2'>
            <p className='typo-caption-2 text-center mb-1'>{data.result.brand}</p>
            <p className='typo-subtitle-4 text-center truncate leading-tight!'>
              {data.result.productName}
            </p>
          </article>
        </section>

        <section className='py-4'>
          <div className='flex items-center gap-1 mb-1'>
            <BellIcon />
            <p className='typo-body-9 text-primary'>개별알림</p>
          </div>

          {data.result.isActiveIntake ? (
            <section className='space-y-2'>
              <div className='no-center-glass px-5 rounded-[20px] flex items-center justify-between h-13'>
                <p className='typo-body-10'>복용 알림 ON/OFF</p>
                <ToggleButton
                  isChecked={notificationEnabled}
                  onClick={() => {
                    updateActiveProduct({ notificationEnabled: !notificationEnabled });
                  }}
                />
              </div>

              <div className='no-center-glass px-5 rounded-[20px] flex items-center justify-between h-13'>
                <p className='typo-body-10'>복용 시간</p>
                <button
                  type='button'
                  aria-label='복용 시간 선택 모달 열기'
                  className='text-neutral transition hover:brightness-75'
                  onClick={() => setIsOpenIntakeTimeModal(true)}
                >
                  {intakeTimeLabel}
                </button>
              </div>

              <div className='no-center-glass px-5 rounded-[20px] flex items-center justify-between h-13'>
                <p className='typo-body-10'>복용 주기</p>
                <button
                  type='button'
                  aria-label='복용 주기 선택 모달 열기'
                  className='text-neutral flex items-center transition hover:brightness-75'
                  onClick={() => setIsOpenIntakeCycleModal(true)}
                >
                  {activeProduct?.frequencyLabel} <ChevronRight size={20} />
                </button>
              </div>
            </section>
          ) : (
            <section className='no-center-glass px-5 pt-6 pb-5 rounded-[20px] flex flex-col items-center justify-between gap-2'>
              <TimerOffIcon />

              <p className='text-center typo-body-10'>
                섭취 중일 때만
                <br />
                알림을 설정할 수 있어요
              </p>

              <p className='text-neutral typo-caption-6'>
                섭취 중인 영양제로 추가하면 알림을 설정할 수 있어요!
              </p>
            </section>
          )}
        </section>

        <section className='space-y-2 pt-4'>
          <TextButton
            type='button'
            text='영양성분 더보기'
            size='xl'
            className='w-full'
            onClick={() => router.push(`/product/${data.result.productId}`)}
          />
          <TextButton
            href={`/reviews/reviews-add?productId=${data.result.productId}`}
            text='후기 작성하기'
            variant='outline'
            size='xl'
            className='w-full'
          />
        </section>
      </div>
      {isOpenIntakeTimeModal && (
        <IntakeTimeModal
          initialTime={activeProduct?.intakeTime}
          onCancel={() => setIsOpenIntakeTimeModal(false)}
          onConfirm={(intakeTime) => {
            setIsOpenIntakeTimeModal(false);
            updateActiveProduct({ intakeTime });
          }}
        />
      )}

      {isOpenIntakeCycleModal && (
        <IntakeCycleModal
          initialCycle={activeProduct?.frequencyLabel}
          onCancel={() => setIsOpenIntakeCycleModal(false)}
          onConfirm={(cycle) => {
            setIsOpenIntakeCycleModal(false);
            updateActiveProduct({ frequency: frequencyCycle[cycle] });
          }}
        />
      )}
    </BottomSheet>
  );
};

export default SupplementDetailBottomSheet;

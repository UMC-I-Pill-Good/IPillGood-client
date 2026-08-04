'use client';

import { BottomSheet, TextButton, ToggleButton } from '@/shared/components';
import Image from 'next/image';
import { BellIcon, TimerOffIcon } from '@/assets';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { IntakeCycleModal, IntakeTimeModal } from '@/shared/components';
import { useQuery } from '@tanstack/react-query';
import { getCabinetProductsDetail } from '@/features/cabinet/api/cabinet';

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
  const [isIntake, setIsIntake] = useState(true);
  const [isOpenIntakeCycleModal, setIsOpenIntakeCycleModal] = useState(false);
  const [isOpenIntakeTimeModal, setIsOpenIntakeTimeModal] = useState(false);

  const { data } = useQuery({
    queryKey: ['cabinetProductDetail', memberProductId],
    queryFn: () => getCabinetProductsDetail(memberProductId!),
    enabled: open && memberProductId !== null,
  });

  if (!data?.result) return null;

  const intakeHour = Number(data.result.activeProduct.intakeTime.split(':')[0]);
  const intakeTimeLabel = `${intakeHour >= 12 ? '오후' : '오전'} ${data.result.activeProduct.intakeTime}`;

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
            <p className='typo-caption-2 text-center'>영양제 브랜드</p>
            <p className='typo-subtitle-4 text-center'>{data.result.productName}</p>
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
                <ToggleButton isChecked={isIntake} onClick={() => setIsIntake((prev) => !prev)} />
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
                  {data.result.activeProduct.frequencyLabel} <ChevronRight size={20} />
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
          <TextButton type='button' text='영양성분 더보기' size='xl' className='w-full' />
          <button
            type='button'
            aria-label='후기 작성 페이지 이동'
            className='shrink-0 inline-flex items-center justify-center w-full typo-body-2 h-13 bg-neutral-300 text-neutral hover:brightness-90 active:brightness-80 shadow-[0_4px_4px_rgba(126,131,135,0.1)] transition-all rounded-lg'
          >
            후기 작성하기
          </button>
        </section>
      </div>
      {isOpenIntakeTimeModal && (
        <IntakeTimeModal
          onCancel={() => setIsOpenIntakeTimeModal(false)}
          onConfirm={() => setIsOpenIntakeTimeModal(false)}
        />
      )}

      {isOpenIntakeCycleModal && (
        <IntakeCycleModal
          onCancel={() => setIsOpenIntakeCycleModal(false)}
          onConfirm={() => setIsOpenIntakeCycleModal(false)}
        />
      )}
    </BottomSheet>
  );
};

export default SupplementDetailBottomSheet;

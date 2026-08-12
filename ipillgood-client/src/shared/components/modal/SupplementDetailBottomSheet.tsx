'use client';

import {
  BottomSheet,
  ConfirmModal,
  IntakeCycleModal,
  IntakeTimeModal,
  TextButton,
  ToggleButton,
} from '@/shared/components';
import Image from 'next/image';
import { BellIcon, TimerOffIcon } from '@/assets';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCabinetProductsDetail } from '@/features/cabinet/api/cabinet';
import { usePatchIntakeProductMutation } from '@/features/cabinet/hooks';
import { frequencyCycle } from '@/features/cabinet/constants/intake.constants';
import { useRouter } from 'next/navigation';
import { usePushAlarmSettings } from '@/features/my/hooks/usePushAlarmSettings';
import { useNotificationSettings } from '@/features/my/hooks/useNotificationSettings';
import clsx from 'clsx';
import { deleteActiveProduct } from '@/features/home/api/intake';
import { intakeTodayQueryKey } from '@/features/home/hooks/useIntakeToday';
import { postIntakeProduct } from '@/features/cabinet/api/intake';
import { showToast } from '@/shared/utils';
import { isAxiosError } from 'axios';

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
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [newIntakeTime, setNewIntakeTime] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['cabinetProductDetail', memberProductId],
    queryFn: () => getCabinetProductsDetail(memberProductId!),
    enabled: open && memberProductId !== null,
  });

  const patchActiveProductMutation = usePatchIntakeProductMutation();

  const invalidateIntakeQueries = () => {
    queryClient.invalidateQueries({ queryKey: ['cabinetProducts'] });
    queryClient.invalidateQueries({ queryKey: ['activeProducts'] });
    queryClient.invalidateQueries({ queryKey: intakeTodayQueryKey });
    queryClient.invalidateQueries({ queryKey: ['intakeCalendar'] });
    queryClient.invalidateQueries({ queryKey: ['growthStage'] });
    queryClient.invalidateQueries({ queryKey: ['cabinetProductDetail'] });
  };

  const addActiveProductMutation = useMutation({
    mutationFn: ({ intakeTime, frequency }: { intakeTime: string; frequency: string }) =>
      postIntakeProduct({ memberProductId: memberProductId!, intakeTime, frequency }),
    onSuccess: (response) => {
      if (!response.isSuccess) {
        showToast.error('섭취 중인 영양제 추가에 실패했어요. 다시 시도해 주세요.');
        return;
      }

      invalidateIntakeQueries();
      showToast.success('섭취 중인 영양제에 추가됐어요.');
    },
    onError: (error) => {
      const errorData = isAxiosError<{ code?: string; message?: string }>(error)
        ? error.response?.data
        : undefined;

      showToast.error(
        errorData?.message ?? '섭취 중인 영양제 추가에 실패했어요. 다시 시도해 주세요.',
      );
    },
  });

  const deleteActiveProductMutation = useMutation({
    mutationFn: deleteActiveProduct,
    onSuccess: () => {
      invalidateIntakeQueries();
      showToast.success('섭취 중인 영양제에서 삭제됐어요.');
      setIsDeleteConfirmModalOpen(false);
    },
    onError: () => showToast.error('삭제에 실패했어요. 다시 시도해 주세요.'),
  });

  const { isPushAlarmOn } = usePushAlarmSettings();
  const { intakePushEnabled } = useNotificationSettings();

  if (!data?.result) return null;

  const activeProduct = data.result.activeProduct;
  const notificationEnabled = activeProduct?.notificationEnabled ?? false;
  const intakeHour = activeProduct ? Number(activeProduct.intakeTime.split(':')[0]) : null;
  const intakeTimeLabel = activeProduct
    ? `${intakeHour !== null && intakeHour >= 12 ? '오후' : '오전'} ${activeProduct.intakeTime}`
    : '';

  const updateActiveProduct = (
    body: {
      intakeTime?: string;
      frequency?: string;
      notificationEnabled?: boolean;
    },
    messages?: { successMessage?: string; errorMessage?: string },
  ) => {
    if (!activeProduct) return;

    patchActiveProductMutation.mutate({
      activeProductId: activeProduct.activeProductId,
      body: {
        intakeTime: body.intakeTime ?? activeProduct.intakeTime,
        frequency: body.frequency ?? activeProduct.frequency,
        notificationEnabled: body.notificationEnabled ?? notificationEnabled,
      },
      successMessage: messages?.successMessage,
      errorMessage: messages?.errorMessage,
    });
  };

  const handleNewIntakeCycleConfirm = (cycle: string) => {
    if (addActiveProductMutation.isPending || !newIntakeTime || memberProductId === null) return;

    addActiveProductMutation.mutate({
      intakeTime: newIntakeTime,
      frequency: frequencyCycle[cycle],
    });
    setIsOpenIntakeCycleModal(false);
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
          <article className='text-center space-y-2 w-[80%]'>
            <p className='typo-caption-2 text-center mb-1'>{data.result.brand}</p>
            <p
              title={data.result.productName}
              className='typo-subtitle-4 text-center leading-tight!'
            >
              {data.result.productName}
            </p>
          </article>
        </section>

        <section className='py-4'>
          <article
            className={clsx('flex items-end justify-between', isPushAlarmOn ? 'mb-2' : 'mb-1')}
          >
            <div className='flex items-center gap-1'>
              <BellIcon />
              <p className='typo-body-9 text-primary'>개별알림</p>
            </div>

            <TextButton
              type='button'
              text={data.result.isActiveIntake ? '섭취 중인 영양제 삭제' : '섭취 중인 영양제 추가'}
              size='sm'
              className='px-3'
              disabled={addActiveProductMutation.isPending || deleteActiveProductMutation.isPending}
              onClick={() => {
                if (data.result.isActiveIntake) {
                  setIsDeleteConfirmModalOpen(true);
                  return;
                }

                setIsOpenIntakeTimeModal(true);
              }}
            />
          </article>

          {!isPushAlarmOn ? (
            <section className='no-center-glass px-5 pt-6 pb-5 rounded-[20px] flex flex-col items-center justify-between gap-2'>
              <TimerOffIcon />

              <p className='text-center typo-body-10'>푸시 알림이 꺼져 있어요.</p>

              <p className='text-neutral typo-caption-6'>
                푸시 알림을 켜면 이 영양제에 대한 알림을 설정할 수 있어요!
              </p>
            </section>
          ) : !intakePushEnabled ? (
            <section className='no-center-glass px-5 pt-6 pb-5 rounded-[20px] flex flex-col items-center justify-between gap-2'>
              <TimerOffIcon />

              <p className='text-center typo-body-10'>복용 알림이 꺼져 있어요.</p>

              <p className='text-neutral typo-caption-6'>
                복용 알림을 켜면 이 영양제에 대한 알림을 설정할 수 있어요!
              </p>
            </section>
          ) : data.result.isActiveIntake ? (
            <section className='space-y-2'>
              <div className='no-center-glass px-5 rounded-[20px] flex items-center justify-between h-13'>
                <p className='typo-body-10'>복용 알림 ON/OFF</p>
                <ToggleButton
                  isChecked={notificationEnabled}
                  onClick={() => {
                    updateActiveProduct(
                      { notificationEnabled: !notificationEnabled },
                      { errorMessage: '알림 설정 변경에 실패했어요.' },
                    );
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
            if (activeProduct) {
              updateActiveProduct({ intakeTime }, { successMessage: '복용 시간이 변경됐어요.' });
              return;
            }

            setNewIntakeTime(intakeTime);
            setIsOpenIntakeCycleModal(true);
          }}
        />
      )}

      {isOpenIntakeCycleModal && (
        <IntakeCycleModal
          initialCycle={activeProduct?.frequencyLabel}
          onCancel={() => setIsOpenIntakeCycleModal(false)}
          onConfirm={(cycle) => {
            if (!activeProduct) {
              handleNewIntakeCycleConfirm(cycle);
              return;
            }

            setIsOpenIntakeCycleModal(false);
            updateActiveProduct(
              { frequency: frequencyCycle[cycle] },
              { successMessage: '복용 주기가 변경됐어요.' },
            );
          }}
        />
      )}

      {isDeleteConfirmModalOpen && activeProduct && (
        <ConfirmModal
          title={
            <>
              해당 영양제를 섭취 중인
              <br />
              영양제에서 <span className='text-semantic-600'>삭제</span>
              하시겠습니까?
            </>
          }
          onConfirm={() => {
            if (deleteActiveProductMutation.isPending) return;

            deleteActiveProductMutation.mutate(activeProduct.activeProductId);
          }}
          onCancel={() => setIsDeleteConfirmModalOpen(false)}
        />
      )}
    </BottomSheet>
  );
};

export default SupplementDetailBottomSheet;

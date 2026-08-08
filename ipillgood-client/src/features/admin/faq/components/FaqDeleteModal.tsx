'use client';

import { useRef, useState } from 'react';

import {
  FaqDoneVectorIcon,
  FaqModalCloseIcon,
  FaqWarningIcon,
  FaqWarningVectorIcon,
} from '@/assets';
import { ModalShell, TextButton } from '@/shared/components';

interface FaqDeleteModalProps {
  onClose: () => void;
  onDelete: () => Promise<void>;
}

const FaqDeleteModal = ({ onClose, onDelete }: FaqDeleteModalProps) => {
  const [isDeleteComplete, setIsDeleteComplete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const deletionLockRef = useRef(false);

  const handleClose = () => {
    if (deletionLockRef.current) {
      return;
    }

    onClose();
  };

  const handleDeleteClick = async () => {
    if (deletionLockRef.current) {
      return;
    }

    deletionLockRef.current = true;
    setIsDeleting(true);

    try {
      await onDelete();
      setIsDeleteComplete(true);
    } catch {
      // API 오류 시 확인 모달을 유지합니다.
    } finally {
      deletionLockRef.current = false;
      setIsDeleting(false);
    }
  };

  if (isDeleteComplete) {
    return (
      <ModalShell
        ariaLabel='FAQ 삭제 처리 완료'
        onClose={handleClose}
        className='h-28! w-[380px]! gap-0! rounded-none! px-3! py-2! shadow-[4px_4px_20px_rgba(126,131,135,0.2)]'
      >
        <button
          type='button'
          aria-label='FAQ 삭제 처리 완료 모달 닫기'
          onClick={handleClose}
          disabled={isDeleting}
          className='self-end'
        >
          <FaqModalCloseIcon aria-hidden='true' className='size-[30px]' />
        </button>

        <div className='flex w-full items-center justify-center gap-2'>
          <div className='flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-200'>
            <span className='relative block h-[14px] w-[18px] shrink-0 overflow-hidden'>
              <FaqDoneVectorIcon
                aria-hidden='true'
                className='absolute left-0 top-0 origin-top-left'
                style={{ transform: 'scale(0.4091)' }}
              />
            </span>
          </div>
          <p className='w-[300px] text-xl font-semibold leading-none text-black'>
            삭제 처리되었습니다.
          </p>
        </div>
      </ModalShell>
    );
  }

  return (
    <ModalShell
      ariaLabel='FAQ 삭제 확인'
      onClose={handleClose}
      className='w-[380px]! gap-[60px]! rounded-[20px]! px-10! py-5! shadow-[4px_4px_20px_rgba(126,131,135,0.2)]'
    >
      <button
        type='button'
        aria-label='FAQ 삭제 확인 모달 닫기'
        onClick={handleClose}
        disabled={isDeleting}
        className='self-end'
      >
        <FaqModalCloseIcon aria-hidden='true' className='size-[30px]' />
      </button>

      <div className='flex w-full flex-col items-center gap-8'>
        <div className='relative size-[100px] shrink-0 overflow-hidden'>
          <FaqWarningIcon aria-hidden='true' className='absolute inset-0 size-full' />
          <FaqWarningVectorIcon aria-hidden='true' className='absolute inset-0 size-full' />
        </div>
        <div className='flex w-full flex-col items-center gap-4 text-center font-semibold leading-none'>
          <p className='text-2xl text-black'>정말 삭제하시겠습니까?</p>
          <p className='text-xl text-neutral'>삭제된 FAQ는 복구할 수 없습니다.</p>
        </div>
      </div>

      <div className='flex w-full items-center justify-center gap-3'>
        <TextButton
          text='취소'
          variant='semanticOutline'
          size='sm'
          onClick={handleClose}
          disabled={isDeleting}
          className='w-[124px] shadow-none'
        />
        <TextButton
          text='삭제'
          variant='semantic'
          size='sm'
          onClick={handleDeleteClick}
          disabled={isDeleting}
          className='w-[124px] shadow-[4px_4px_2px_rgba(0,0,0,0.15)]'
        />
      </div>
    </ModalShell>
  );
};

export default FaqDeleteModal;

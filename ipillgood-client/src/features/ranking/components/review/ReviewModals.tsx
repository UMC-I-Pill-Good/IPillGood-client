'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { ModalShell, TextButton } from '@/shared/components';
import type { ReviewReportReason } from '../../types/rankingReview';

const REPORT_REASONS: readonly { value: ReviewReportReason; label: string }[] = [
  { value: 'AD_PROMOTION', label: '광고 또는 홍보성 내용' },
  { value: 'ABUSE', label: '욕설 또는 비방' },
  { value: 'FALSE_INFO', label: '허위 정보 포함' },
  { value: 'PERSONAL_INFO', label: '개인정보 포함' },
  { value: 'ETC', label: '기타' },
];

const ReportCheckbox = ({ checked }: { checked: boolean }) => (
  <span
    aria-hidden='true'
    className={`inline-flex size-5 shrink-0 items-center justify-center rounded border ${
      checked
        ? 'border-neutral-800 bg-neutral-800 text-white'
        : 'border-neutral-800 bg-white text-transparent'
    }`}
  >
    <Check size={14} strokeWidth={3} />
  </span>
);

interface ReviewReportModalProps {
  onCancel: () => void;
  onSubmit: (reasonList: ReviewReportReason[], detail: string) => void;
}

export const ReviewReportModal = ({ onCancel, onSubmit }: ReviewReportModalProps) => {
  const [selectedReasonList, setSelectedReasonList] = useState<ReviewReportReason[]>([]);
  const [content, setContent] = useState('');

  return (
    <ModalShell
      onClose={onCancel}
      ariaLabel='후기 신고'
      overlayClassName='bg-neutral-800/50 px-5'
      className='gap-4 border border-white px-5 shadow-[4px_4px_20px_rgba(126,131,135,0.2)]'
    >
      <h2 className='text-center typo-body-5 text-semantic-600'>신고하기</h2>
      <p className='text-center typo-caption-2 text-neutral-800'>
        이 후기를 신고하는 이유를 선택해 주세요.
      </p>
      <div className='flex flex-col gap-2'>
        {REPORT_REASONS.map((reason) => {
          const isChecked = selectedReasonList.includes(reason.value);
          return (
            <button
              key={reason.value}
              type='button'
              aria-pressed={isChecked}
              className='flex items-center gap-2 text-left typo-caption-2 text-black'
              onClick={() => {
                setSelectedReasonList((current) =>
                  current.includes(reason.value)
                    ? current.filter((selectedReason) => selectedReason !== reason.value)
                    : [...current, reason.value],
                );
              }}
            >
              <ReportCheckbox checked={isChecked} />
              <span>{reason.label}</span>
            </button>
          );
        })}
      </div>
      <div className='relative w-67.5'>
        <textarea
          value={content}
          maxLength={200}
          onChange={(event) => setContent(event.target.value)}
          placeholder='추가 내용을 입력해 주세요 (선택사항)'
          className='h-35.5 w-full resize-none rounded-lg border border-neutral-800 p-2 typo-caption-6 text-black outline-none placeholder:text-neutral-800'
        />
        <span className='absolute bottom-3 right-3 typo-caption-7 text-neutral-800'>
          {content.length}/200
        </span>
      </div>
      <div className='flex w-65.25 items-center justify-center gap-3'>
        <TextButton
          text='취소'
          variant='semanticOutline'
          size='sm'
          className='w-31'
          onClick={onCancel}
        />
        <TextButton
          text='신고하기'
          variant='semantic'
          size='sm'
          className='w-31 shadow-[4px_4px_2px_rgba(0,0,0,0.15)]'
          disabled={selectedReasonList.length === 0}
          onClick={() => onSubmit(selectedReasonList, content)}
        />
      </div>
    </ModalShell>
  );
};

interface ReviewDeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const ReviewDeleteModal = ({ onConfirm, onCancel }: ReviewDeleteModalProps) => {
  return (
    <ModalShell
      onClose={onCancel}
      ariaLabel='후기 삭제 확인'
      className='border border-white shadow-[4px_4px_40px_rgba(126,131,135,0.16)]'
    >
      <p className='mb-2 text-center typo-body-9 text-black'>
        작성한 후기를 정말 삭제하시겠습니까?
      </p>
      <p className='text-center typo-caption-6 text-semantic-600'>
        작성한 후기는 복구가 어렵습니다.
      </p>
      <div className='mt-5 flex items-center gap-2.5'>
        <TextButton
          text='예'
          variant='semanticOutline'
          size='sm'
          onClick={onConfirm}
          className='flex-1'
        />
        <TextButton
          text='아니요'
          variant='semantic'
          size='sm'
          onClick={onCancel}
          className='flex-1'
        />
      </div>
    </ModalShell>
  );
};

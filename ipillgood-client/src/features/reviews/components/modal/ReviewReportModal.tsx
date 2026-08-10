'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Check } from 'lucide-react';
import { ModalShell, TextButton } from '@/shared/components';

const REPORT_REASONS = [
  { value: 'AD_PROMOTION', label: '광고 또는 홍보성 내용' },
  { value: 'ABUSE', label: '욕설 또는 비방' },
  { value: 'FALSE_INFO', label: '허위 정보 포함' },
  { value: 'PERSONAL_INFO', label: '개인정보 포함' },
  { value: 'ETC', label: '기타' },
] as const;

type ReviewReportReason = (typeof REPORT_REASONS)[number]['value'];

interface ReviewReportModalProps {
  onCancel: () => void;
  onSubmit: (reason: ReviewReportReason, detail: string) => void;
  isSubmitting: boolean;
}

const ReviewReportModal = ({ onCancel, onSubmit, isSubmitting }: ReviewReportModalProps) => {
  const [selectedReason, setSelectedReason] = useState<ReviewReportReason | null>(null);
  const [content, setContent] = useState('');

  return createPortal(
    <ModalShell
      onClose={onCancel}
      ariaLabel='후기 신고'
      className='max-h-[calc(100dvh-2rem)] gap-4 overflow-y-auto border border-white !px-5 shadow-[4px_4px_20px_rgba(126,131,135,0.2)]'
    >
      <h2 className='text-center typo-body-5 text-semantic-600'>신고하기</h2>
      <p className='text-center typo-caption-2 text-neutral-800'>
        이 후기를 신고하는 이유를 선택해 주세요.
      </p>
      <div className='flex flex-col gap-2'>
        {REPORT_REASONS.map((reason) => {
          const isChecked = selectedReason === reason.value;

          return (
            <button
              key={reason.value}
              type='button'
              aria-pressed={isChecked}
              className='flex items-center gap-2 text-left typo-caption-2 text-black'
              onClick={() => setSelectedReason(reason.value)}
            >
              <span
                aria-hidden='true'
                className={`inline-flex size-5 shrink-0 items-center justify-center rounded border ${
                  isChecked
                    ? 'border-neutral-800 bg-neutral-800 text-white'
                    : 'border-neutral-800 bg-white text-transparent'
                }`}
              >
                <Check size={14} strokeWidth={3} />
              </span>
              <span>{reason.label}</span>
            </button>
          );
        })}
      </div>
      <div className='relative w-67.5 self-center'>
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
      <div className='flex w-65.25 items-center justify-center gap-3 self-center'>
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
          disabled={!selectedReason || isSubmitting}
          onClick={() => selectedReason && onSubmit(selectedReason, content)}
        />
      </div>
    </ModalShell>,
    document.body,
  );
};

export default ReviewReportModal;

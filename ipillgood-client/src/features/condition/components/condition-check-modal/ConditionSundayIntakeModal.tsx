'use client';

import { ConfirmModal } from '@/shared/components';

interface ConditionSundayIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

const ConditionSundayIntakeModal = ({
  isOpen,
  onClose,
  onContinue,
}: ConditionSundayIntakeModalProps) => {
  if (!isOpen) return null;

  return (
    /* 취소 버튼 테두리를 border: 1px solid #B9A9FF 로 정밀 설정 */
    <div
      className={
        '[&_p#confirm-modal-title]:text-[16px]! [&_p#confirm-modal-title]:font-semibold! [&_p#confirm-modal-title]:leading-none! [&_p#confirm-modal-title]:tracking-normal! [&_p#confirm-modal-title]:text-center! [&_p#confirm-modal-title]:text-[#111111]! ' +
        '[&_p#confirm-modal-content]:text-[12px]! [&_p#confirm-modal-content]:font-medium! [&_p#confirm-modal-content]:leading-none! [&_p#confirm-modal-content]:tracking-normal! [&_p#confirm-modal-content]:text-center! [&_p#confirm-modal-content]:whitespace-pre-line! [&_p#confirm-modal-content]:text-[#D53D4A]! ' +
        '[&_button]:shadow-none! ' +
        '[&_button:first-child]:text-[#B9A9FF]! [&_button:first-child]:border-[1px]! [&_button:first-child]:border-[#B9A9FF]! [&_button:first-child]:hover:bg-purple-50! ' +
        '[&_button:last-child]:bg-[#7F99FF]! [&_button:last-child]:text-white! [&_button:last-child]:hover:bg-[#6580EE]!'
      }
    >
      <ConfirmModal
        title='오늘 영양제 섭취 전이에요!'
        content={`지금 컨디션을 기록하면 미섭취가 반영되어\n점수에 영향을 줄 수 있어요.`}
        confirmLabel='계속하기'
        cancelLabel='취소'
        onConfirm={onContinue}
        onCancel={onClose}
      />
    </div>
  );
};

export default ConditionSundayIntakeModal;

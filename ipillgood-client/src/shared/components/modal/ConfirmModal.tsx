import { useEscapeKey, useScrollLock } from '@/shared/hooks';

interface ConfirmModalProps {
  title: string;
  content?: string;
  buttonLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({ title, content, buttonLabel, onConfirm, onCancel }: ConfirmModalProps) => {
  useScrollLock();
  useEscapeKey(onCancel);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <div className='flex flex-col overflow-hidden rounded-[20px] bg-white px-7.5 py-6'>
        <p className='text-center text-body-9 mb-2.5'>{title}</p>
        <p className='text-center text-caption-6 text-neutral-800'>{content}</p>

        <div className='mt-4 flex items-center gap-3'></div>
      </div>
    </div>
  );
};

export default ConfirmModal;

import { WarningIcon } from '@/assets';
import { ModalShell, TextButton } from '@/shared/components';

interface ReAdditionWarningModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ReAdditionWarningModal = ({ onConfirm, onCancel }: ReAdditionWarningModalProps) => {
  return (
    <ModalShell
      onClose={onCancel}
      ariaLabel='당일 재추가 제한 안내'
      className='w-88 overflow-hidden px-10 py-8'
    >
      <section className='flex flex-col items-center justify-center space-y-4'>
        <WarningIcon width={60} height={60} />

        <p className='typo-body-1'>오늘은 재추가할 수 없어요</p>
        <p className='typo-body-9 text-center text-semantic'>
          오늘 삭제한 영양제는 내일부터 다시 <br />
          추가할 수 있어요. <br />
          복용 기록의 정확한 관리를 위해 <br />
          당일 재추가는 제한됩니다.
        </p>
      </section>

      <section className='mt-8 flex items-center gap-3'>
        <TextButton
          type='button'
          text='확인'
          variant='semantic'
          size='sm'
          onClick={onConfirm}
          className='flex-1 shadow-[4px_4px_2px_rgba(0,0,0,0.15)]'
        />
      </section>
    </ModalShell>
  );
};

export default ReAdditionWarningModal;

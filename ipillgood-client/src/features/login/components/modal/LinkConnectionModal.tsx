import { ModalShell, TextButton } from '@/shared/components';
import { Link2Off } from 'lucide-react';

interface LogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isPending?: boolean;
}

const LinkConnectionModal = ({ onConfirm, onCancel, isPending }: LogoutModalProps) => {
  return (
    <ModalShell
      onClose={onCancel}
      ariaLabel='로그아웃'
      className='w-87.75 px-[43.5px] py-[26.5px] rounded-[30px]'
    >
      <div className='flex flex-col items-center'>
        <div className='w-25 h-25 rounded-full bg-primary-200 flex items-center justify-center mb-4'>
          <Link2Off size={50} className='text-primary' />
        </div>
        <p className='text-center typo-body-1 mb-2 text-black'>이미 가입된 계정이 있어요</p>
        <p className='text-center typo-body-10 text-neutral-800'>
          이미 해당 이메일로 가입된 계정이 있어요. <br />
          기존 계정에 <span className='text-primary-600 typo-body-5'>[카카오/네이버] </span>
          로그인을
          <br /> 연동하시겠어요?
        </p>
      </div>
      <div className='mt-4 flex justify-between items-center gap-3.5'>
        <TextButton
          type='button'
          text='취소'
          variant='outline'
          size='sm'
          onClick={onCancel}
          className='flex-1'
        />
        <TextButton
          type='button'
          text='연동하기'
          variant='primary'
          size='sm'
          onClick={onConfirm}
          disabled={isPending}
          className='flex-1 shadow-[4px_4px_4px_0px__rgba(0,0,0,0.15)]'
        />
      </div>
    </ModalShell>
  );
};

export default LinkConnectionModal;

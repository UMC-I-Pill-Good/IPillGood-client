import { ModalShell, TextButton } from '@/shared/components';
import { LogOut } from 'lucide-react';

interface LogoutModalProps {
  nickname: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal = ({ nickname, onConfirm, onCancel }: LogoutModalProps) => {
  return (
    <ModalShell
      onClose={onCancel}
      ariaLabel='로그아웃'
      className='w-87.75 px-[43.5px] py-[26.5px] rounded-[30px]'
    >
      <div className='flex flex-col items-center'>
        <div className='w-25 h-25 rounded-full bg-primary-200 flex items-center justify-center mb-4'>
          <LogOut size={50} className='text-primary-600' />
        </div>
        <p className='text-center typo-body-1 mb-2 text-black'>로그아웃 하시겠습니까?</p>
        <p className='text-center typo-body-10 text-neutral-800'>
          로그아웃하셔도 <span className='text-primary-600'>{nickname}님</span>의 활동 기록은
          <span className='mt-1 block'>안전하게 보관됩니다.</span>
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
          text='로그아웃'
          variant='primary'
          size='sm'
          onClick={onConfirm}
          className='flex-1 shadow-[4px_4px_4px_0px__rgba(0,0,0,0.15)]'
        />
      </div>
    </ModalShell>
  );
};

export default LogoutModal;

import { WarningIcon } from '@/assets';

const WithdrawWarning = () => {
  return (
    <section className='flex flex-col justify-center items-center text-blck mb-8'>
      <WarningIcon />
      <h2 className='typo-body-1 mt-4'>정말 탈퇴하시겠어요?</h2>
      <p className='typo-caption-2 mt-2 mb-1'>회원 탈퇴 시 사용자의 모든 데이터가 삭제되며,</p>
      <p className='typo-caption-2'>복구가 불가능합니다.</p>
    </section>
  );
};

export default WithdrawWarning;

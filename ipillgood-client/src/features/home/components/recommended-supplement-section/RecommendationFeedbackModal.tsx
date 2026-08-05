import { ModalShell, TextButton } from '@/shared/components';

interface RecommendationFeedbackModalProps {
  nickname: string;
  onClose: () => void;
  onSubmit: (responseType: 'HELPFUL' | 'UNSURE') => void;
}

const RecommendationFeedbackModal = ({
  nickname,
  onClose,
  onSubmit,
}: RecommendationFeedbackModalProps) => {
  return (
    <ModalShell onClose={onClose} ariaLabel='정기 추천 영양제가 도움이 되셨나요?'>
      <p className='text-center typo-body-9 mb-2'>정기 추천 영양제가 도움이 되셨나요?</p>
      <p className='text-center typo-caption-6 text-neutral-800'>
        <span className='text-primary-600 typo-caption-1'>{nickname}님</span>의 건강에 더욱 도움을
        드리고 싶어요!
      </p>

      <div className='mt-5 flex items-center gap-3'>
        <TextButton
          type='button'
          text='아니요'
          variant='outline'
          size='sm'
          onClick={() => onSubmit('UNSURE')}
          className='flex-1 shadow-none'
        />
        <TextButton
          type='button'
          text='네'
          variant='primary'
          size='sm'
          onClick={() => onSubmit('HELPFUL')}
          className='flex-1 shadow-[4px_4px_2px_rgba(0,0,0,0.15)]'
        />
      </div>
    </ModalShell>
  );
};

export default RecommendationFeedbackModal;

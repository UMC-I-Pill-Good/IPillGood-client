'use client';

import { ModalShell, TextButton } from '@/shared/components';

interface RecommendationSurveyRetakeModalProps {
  nickname: string;
  onClose: () => void;
}

const RecommendationSurveyRetakeModal = ({
  nickname,
  onClose,
}: RecommendationSurveyRetakeModalProps) => {
  return (
    <ModalShell onClose={onClose} ariaLabel='설문을 다시 하시겠습니까?'>
      <p className='text-center typo-body-9 mb-2'>설문을 다시 하시겠습니까?</p>
      <p className='text-center typo-caption-6 text-neutral-800 leading-tight!'>
        도움이 되어드리지 못해 죄송합니다. <br />
        정기 설문을 다시 작성해주시면
        <br />
        더욱 <span className='text-primary-600 typo-caption-1'>{nickname}님</span>께 맞는 영양제로
        다시 추천해드릴게요!
      </p>
      <div className='mt-4 flex items-center gap-3'>
        <TextButton
          type='button'
          text='아니오'
          variant='outline'
          size='sm'
          onClick={onClose}
          className='flex-1 shadow-none'
        />
        <TextButton
          type='button'
          text='네'
          variant='primary'
          size='sm'
          href='/survey'
          className='flex-1 shadow-[4px_4px_2px_rgba(0,0,0,0.15)]'
        />
      </div>
    </ModalShell>
  );
};

export default RecommendationSurveyRetakeModal;

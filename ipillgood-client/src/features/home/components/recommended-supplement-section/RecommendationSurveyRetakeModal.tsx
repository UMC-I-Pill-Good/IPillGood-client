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
    <ModalShell onClose={onClose} ariaLabel='도움이 되어드리지 못해 죄송합니다.'>
      <p className='text-center typo-body-9 mb-2'>도움이 되어드리지 못해 죄송합니다.</p>
      <p className='text-center typo-caption-6 text-neutral-800'>
        정기 설문을 다시 작성해주시면
        <br />
        더욱 <span className='text-primary-600 typo-caption-1'>{nickname}님</span>께 맞는 영양제로
        다시 추천해드릴게요!
      </p>
      <TextButton
        type='button'
        text='설문 바로가기'
        variant='primary'
        size='lg'
        href='/home'
        className='mt-5 w-full'
      />
    </ModalShell>
  );
};

export default RecommendationSurveyRetakeModal;

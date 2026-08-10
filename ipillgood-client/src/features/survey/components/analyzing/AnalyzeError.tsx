'use client';

import { MascotSadIcon } from '@/assets';
import { ConfirmModal, IconButton, TextButton } from '@/shared/components';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useResetSurvey } from '@/features/survey/hooks';
import { useMutation } from '@tanstack/react-query';
import { postRecommendationRetry } from '../../api/recommendation';

interface AnalyzeErrorProps {
  recommendationId: number;
}

const AnalyzeError = ({ recommendationId }: AnalyzeErrorProps) => {
  const router = useRouter();
  const { resetSurvey } = useResetSurvey();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: () => postRecommendationRetry(recommendationId),
    onSuccess: (data) => {
      const { status, recommendationId } = data.result;

      if (status === 'PENDING') {
        router.replace(`/survey/analyzing?recommendationId=${recommendationId}`);
        return;
      }

      if (status === 'NO_RESULT') {
        alert('추천 가능한 영양제가 없습니다. 설문을 다시 진행해주세요.');
        resetSurvey();
        router.replace('/survey');
        return;
      }

      // FAILED면 현재 페이지 유지
      alert('추천 생성에 다시 실패했습니다. 다시 시도해주세요.');
    },
    onError: () => {
      alert('추천 재생성 요청에 실패했습니다.');
    },
  });

  return (
    <main className='flex min-h-screen flex-col px-5 py-4'>
      <section className='flex justify-end'>
        <IconButton ariaLabel='분석 취소 버튼' icon={<X />} onClick={() => setIsOpenModal(true)} />
      </section>

      <section className='flex flex-1 flex-col items-center justify-center mt-12'>
        <article className='flex flex-col items-center justify-center typo-subtitle-5 mb-30'>
          <p className='whitespace-pre-line text-center leading-7'>
            {'추천 결과를 불러오는 데\n실패했습니다.'}
          </p>
          <span className='typo-subtitle-5 text-semantic mt-3'>다시 시도해 주세요.</span>
        </article>

        <MascotSadIcon />

        <TextButton
          type='button'
          text='다시 시도'
          variant='semantic'
          size='xl'
          className='w-full mt-auto'
          disabled={isPending}
          onClick={() => mutate()}
        />
      </section>

      {isOpenModal && (
        <ConfirmModal
          title={
            <span>
              설문을 <span className='text-semantic'>중단</span>하시겠습니까?
            </span>
          }
          onCancel={() => setIsOpenModal(false)}
          onConfirm={() => {
            resetSurvey();
            router.push('/survey');
            setIsOpenModal(false);
          }}
        />
      )}
    </main>
  );
};

export default AnalyzeError;

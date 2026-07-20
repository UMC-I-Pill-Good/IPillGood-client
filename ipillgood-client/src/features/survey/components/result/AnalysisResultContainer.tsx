'use client';

import { IconButton, TextButton } from '@/shared/components';
import RecommendationList from './RecommendationList';
import { BulbIcon, CheckCircleIcon } from '@/assets';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

const AnalysisResultContainer = () => {
  const router = useRouter();

  return (
    <main className='flex flex-1 min-h-screen flex-col py-4 px-5'>
      <section className='flex justify-end py-4'>
        <IconButton ariaLabel='분석 취소 버튼' icon={<X />} />
      </section>

      <section className='flex flex-col items-center justify-center py-4'>
        <CheckCircleIcon />
        <h5 className='typo-body-1 mt-5'>설문이 완료되었어요!</h5>
        <h5 className='typo-body-1 mt-2'>
          <span className='text-primary'>누누 님</span>에게 딱 맞는 영양 성분을 추천드려요
        </h5>

        <p className='text-neutral text-center typo-caption-2 leading-4! whitespace-pre-line mt-4.5'>
          {
            '아필굿은 여러분께 참고용 정보를 제공합니다.\n설문 기반 맞춤 결과이므로,\n정확한 상담이 필요하다면 전문가와 상담을 권장드려요.'
          }
        </p>
      </section>

      <RecommendationList />

      <section className='py-4 pb-8'>
        <div className='bg-point-200 rounded-[20px] p-4'>
          <article className='flex items-center gap-1'>
            <div className='bg-white rounded-full p-1 inline-flex items-center justify-center'>
              <BulbIcon />
            </div>
            <p className='text-point-900 typo-body-5'>꾸준한 섭취가 중요해요!</p>
          </article>

          <div className='ml-7'>
            <p className='text-neutral mt-2'>
              추천 영양제는 개인의 건강 상태와 생활 습관에 따라 효과가 다를 수 있어요.
            </p>
            <p className='text-neutral mt-1.5'>아필굿과 함께 꾸준히 섭취해 보세요!</p>
          </div>
        </div>
      </section>

      <TextButton
        type='button'
        text='아필굿 시작하기'
        size='xl'
        className='w-full mt-auto'
        onClick={() => router.push('/home')}
      />
    </main>
  );
};

export default AnalysisResultContainer;

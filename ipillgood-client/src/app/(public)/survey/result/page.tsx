'use client';

import { BiggerBadgeIcon, BulbIcon, CheckCircleIcon } from '@/assets';
import { Chip, IconButton, TextButton } from '@/shared/components';
import { X } from 'lucide-react';
import vitaminImage from '@/assets/images/vitamin.png';
import Image from 'next/image';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

const recommendations = [
  {
    id: 1,
    name: '비타민 D',
    reason:
      '칼슘 흡수를 도와 뼈와 치아를 튼튼하게 하고, 면역 체계를 강화하며, 우울증 완화와 만성 질환 예방에 핵심적인 역할을 함.',
    chips: ['활력', '면역', '뼈 건강'],
  },
  {
    id: 2,
    name: '오메가3',
    reason: '혈행 개선과 눈 건강 유지에 도움을 줄 수 있으며 심혈관 건강 관리에 도움이 됩니다.',
    chips: ['혈행', '눈 건강', '심장'],
  },
  {
    id: 3,
    name: '마그네슘',
    reason: '근육과 신경 기능 유지에 도움을 주며 피로 개선과 숙면에 도움을 줄 수 있습니다.',
    chips: ['수면', '근육', '피로'],
  },
];

const badgeColor = {
  1: 'text-primary',
  2: 'text-point-800',
  3: 'text-secondary',
} as const;

const ResultPage = () => {
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

      <section className='space-y-2 py-4'>
        {recommendations.map((item, index) => (
          <div
            key={item.id}
            className='flex w-full items-center gap-3 rounded-[20px] border-none bg-primary/30 px-3 py-4 no-center-glass'
          >
            <section className='flex shrink-0 items-center justify-center gap-3'>
              <span
                className={clsx(
                  'typo-body-2 flex items-center',
                  badgeColor[(index + 1) as keyof typeof badgeColor],
                )}
              >
                <BiggerBadgeIcon />
                {index + 1}
              </span>

              <Image src={vitaminImage} alt={item.name} className='shrink-0' />
            </section>

            <section className='space-y-2'>
              <article className='flex flex-col gap-1.5'>
                <p className='typo-body-5'>{item.name}</p>

                <p className='typo-body-10 text-primary-700'>추천 이유</p>

                <p className='typo-caption-3 leading-4! text-neutral-900'>{item.reason}</p>
              </article>

              <article className='flex items-center gap-1'>
                {item.chips.map((chip) => (
                  <Chip key={chip} text={chip} variant='point' />
                ))}
              </article>
            </section>
          </div>
        ))}
      </section>

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

export default ResultPage;

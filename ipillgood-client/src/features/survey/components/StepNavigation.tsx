'use client';

import { ConfirmModal, IconButton } from '@/shared/components';
import clsx from 'clsx';
import { ChevronLeft, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '@/shared/hooks';
import { showToast } from '@/shared/utils';
import { useResetSurvey } from '../hooks/useResetSurvey';

interface StepNavigationProps {
  step: number;
  onBack: () => void;
}

const StepNavigation = ({ step, onBack }: StepNavigationProps) => {
  const router = useRouter();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  const { resetSurvey } = useResetSurvey(); // 설문 상태 초기화
  const { getOnboardingCompleted } = useLocalStorage();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOnboardingCompleted(getOnboardingCompleted());
  }, [getOnboardingCompleted]);

  return (
    <section>
      <article className='flex items-center justify-between'>
        {(step > 1 || onboardingCompleted) && (
          <IconButton icon={<ChevronLeft size={26} />} ariaLabel='뒤로 가기' onClick={onBack} />
        )}
        {step === 1 && !onboardingCompleted && <div className='size-9' />}
        <IconButton
          icon={<X size={26} />}
          ariaLabel='취소 모달 열기'
          onClick={() => setIsOpenModal(true)}
        />
      </article>

      <article className='mt-4 flex items-center gap-5'>
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className={clsx(
              'h-1 flex-1 rounded-full',
              step >= item ? 'bg-primary' : 'bg-neutral-500',
            )}
          />
        ))}
      </article>

      {isOpenModal && (
        <ConfirmModal
          title={
            <span>
              설문을 <span className='text-semantic'>초기화</span>하시겠습니까?
            </span>
          }
          content='아필굿의 맞춤 추천은 초기 설문 정보를 기반으로 만들어지기 때문에, 완료가 꼭 필요해요!'
          onCancel={() => setIsOpenModal(false)}
          onConfirm={() => {
            resetSurvey();
            showToast.success('설문이 초기화되었습니다.');
            router.push('/survey');
            setIsOpenModal(false);
          }}
        />
      )}
    </section>
  );
};

export default StepNavigation;

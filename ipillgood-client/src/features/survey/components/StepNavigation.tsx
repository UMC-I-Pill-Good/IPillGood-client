import { ConfirmModal, IconButton } from '@/shared/components';
import clsx from 'clsx';
import { ChevronLeft, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useResetSurvey } from '../hooks/useResetSurvey';

interface StepNavigationProps {
  step: number;
  onBack: () => void;
}

const StepNavigation = ({ step, onBack }: StepNavigationProps) => {
  const router = useRouter();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const { resetSurvey } = useResetSurvey();

  return (
    <section>
      <article className='flex items-center justify-between'>
        <IconButton icon={<ChevronLeft size={26} />} ariaLabel='뒤로 가기' onClick={onBack} />
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
    </section>
  );
};

export default StepNavigation;

'use client';

import { TextButton } from '@/shared/components';
import AlreadyInIntakeModal from './AlreadyIntakeModal';
import { useAddToIntakeModal } from '../hooks/useAddToIntakeModal';

interface AddToIntakeGuideSectionProps {
  ingredientId: number;
}

const AddToIntakeGuideSection = ({ ingredientId }: AddToIntakeGuideSectionProps) => {
  const { isOpen, handleAddClick, closeModal, goToCabinet } = useAddToIntakeModal(ingredientId);

  return (
    <section>
      <h2 className='typo-body-1 text-black whitespace-pre-line'>
        해당 영양 성분과 관련된 영양제를{'\n'} 소유하고 있어요!
      </h2>
      <p className='typo-caption-6 text-neutral-800 mt-2 whitespace-pre-line leading-4!'>
        꾸준히 섭취하면 <span className='text-primary-600 typo-caption-1'>00님</span>의 건강에
        도움이 될 거예요.{'\n'} 해당 성분과 관련된 영양제 섭취를 시작하기 위해{'\n'}
        <span className='text-point-900'>섭취 중인 영양제로 추가해 보세요!</span>
      </p>

      <TextButton
        type='button'
        variant='primary'
        size='xl'
        text='섭취 중인 영양제에 추가하기'
        className='w-full mt-5.5'
        onClick={handleAddClick}
      />

      {isOpen && <AlreadyInIntakeModal onClose={closeModal} onConfirm={goToCabinet} />}
    </section>
  );
};

export default AddToIntakeGuideSection;

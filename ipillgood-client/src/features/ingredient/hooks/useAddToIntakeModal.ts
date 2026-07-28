import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const useAddToIntakeModal = (ingredientId: number) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleAddClick = () => {
    //  TODO: 사전 체크
    const isAlreadyInIntake = true; // TODO: 실제 값으로 변경
    if (isAlreadyInIntake) {
      setIsOpen(true);
      return;
    }
    //  TODO: 섭취 중인 영양제에 추가
  };

  const closeModal = () => setIsOpen(false);
  const goToCabinet = () => router.push('/cabinet');

  return { isOpen, handleAddClick, closeModal, goToCabinet };
};

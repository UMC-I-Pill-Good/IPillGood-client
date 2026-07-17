import { useState } from 'react';

export const useTodayIntakeCheck = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckIntake = () => setIsModalOpen(true);

  const handleModalCancel = () => setIsModalOpen(false);

  const handleModalConfirm = (checkedIdList: number[]) => {
    // TODO: 실제 섭취 반영 로직
    setIsModalOpen(false);
  };

  return { isModalOpen, handleCheckIntake, handleModalCancel, handleModalConfirm };
};

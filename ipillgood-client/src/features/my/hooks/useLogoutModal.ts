import { useState } from 'react';

export const useLogoutModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const confirmLogout = () => {
    // TODO: 로그아웃
    setIsOpen(false);
  };

  return { isOpen, openModal, closeModal, confirmLogout };
};

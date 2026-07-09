'use client';

import IconButton from '@/shared/components/button/IconButton';
import ConfirmModal from '@/shared/components/modal/ConfirmModal';
import { ChevronLeft, X } from 'lucide-react';
import { useState } from 'react';

const ExamplePage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className='p-4 flex flex-col gap-4'>
      <IconButton icon={<ChevronLeft size={26} />} />
      <IconButton icon={<X size={22} />} disabled={true} />
      <button
        onClick={() => setModalOpen(true)}
        className='bg-blue-500 text-white px-4 py-2 rounded'
      >
        모달 오픈
      </button>

      {modalOpen && (
        <ConfirmModal
          title='오늘 영양제, 챙겨 드셨나요?'
          content='건강한 루틴이 쌓이고 있어요!'
          onConfirm={() => setModalOpen(false)}
          onCancel={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ExamplePage;

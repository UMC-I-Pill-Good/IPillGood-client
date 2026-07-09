'use client';

import { TextButton, IconButton, Chip, ConfirmModal, CheckboxButton } from '@/shared/components';
import { ChevronLeft, X } from 'lucide-react';
import { useState } from 'react';

const ExamplePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <div className='p-4 flex flex-col gap-4'>
      <IconButton icon={<ChevronLeft size={26} />} ariaLabel='뒤로 가기' />
      <IconButton icon={<X size={22} />} ariaLabel='닫기' disabled={true} />
      <button
        onClick={() => setModalOpen(true)}
        className='bg-amber-500 text-white px-4 py-2 rounded'
      >
        모달 오픈
      </button>
      <TextButton type='button' text='텍스트' variant='primary' size='xl' className='w-88.5' />
      <TextButton type='button' text='텍스트' variant='primary' size='lg' className='w-63.5' />
      <TextButton type='button' text='텍스트' variant='primary' size='md' className='w-63.5' />
      <TextButton
        type='button'
        text='텍스트'
        variant='primary'
        size='sm'
        className='rounded-full w-39'
      />
      <TextButton type='button' text='텍스트' variant='primary' size='sm' className='w-39' />
      <TextButton type='button' text='텍스트' variant='primary' size='sm' className='w-26' />
      <TextButton type='button' text='텍스트' variant='primary' size='sm' className='w-21.5' />
      <TextButton type='button' text='텍스트' variant='secondary' size='sm' className='w-21.5' />
      <TextButton type='button' text='텍스트' variant='assistive' size='sm' className='w-21.5' />
      <TextButton type='button' text='텍스트' variant='outline' size='sm' className='w-21.5' />

      <Chip text='텍스트' className='w-15' />
      <Chip text='텍스트' variant='point' icon={true} />
      <Chip text='텍스트' variant='point' />

      <CheckboxButton checked={checked} onClick={() => setChecked((prev) => !prev)} />
      <CheckboxButton checked={checked} onClick={() => setChecked((prev) => !prev)} size='lg' />

      {modalOpen && (
        <ConfirmModal
          title='해당 영양제를 섭취 중인 영양제에서'
          content='건강한 루틴이 쌓이고 있어요!'
          onConfirm={() => setModalOpen(false)}
          onCancel={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ExamplePage;

'use client';

import {
  TextButton,
  IconButton,
  Chip,
  ConfirmModal,
  CheckboxButton,
  ToggleButton,
  Input,
  SelectionCard,
  SearchBar,
  BottomSheet,
} from '@/shared/components';
import { Header } from '@/shared/layout';
import { showToast } from '@/shared/utils';
import { Bone, Brain, ChevronLeft, HeartPulse, X } from 'lucide-react';
import { useState } from 'react';

const healthConcernItems = [
  { id: 'heart', label: '심혈관', icon: HeartPulse },
  { id: 'brain', label: '두뇌', icon: Brain },
  { id: 'bone', label: '뼈 건강', icon: Bone },
];

const ExamplePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [selectedHealthConcern, setSelectedHealthConcern] = useState('heart');
  const [searchValue, setSearchValue] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className='flex flex-col gap-4'>
      <Header showBackButton={false} title='마이페이지' />
      <Header showCloseButton={true} title='알림 설정' />
      <Header showCloseButton={true} />
      <Header title='영양제 이름' />
      <div className='flex flex-col gap-4 p-4 pb-28'>
        <IconButton icon={<ChevronLeft size={26} />} ariaLabel='뒤로 가기' />
        <IconButton icon={<X size={22} />} ariaLabel='닫기' disabled={true} />
        <button
          onClick={() => setModalOpen(true)}
          className='bg-amber-500 text-white px-4 py-2 rounded'
        >
          모달 오픈
        </button>
        <button
          onClick={() => setSheetOpen(true)}
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          바텀시트 오픈
        </button>
        <button
          onClick={() =>
            showToast.success(
              '성공했습니다 성공했습니다 성공했습니다 성공했습니다 성공했습니다 성공했습니다',
            )
          }
          className='bg-green-400 text-white px-4 py-2 rounded'
        >
          성공 토스트
        </button>
        <button
          onClick={() => showToast.error('실패했습니다')}
          className='bg-red-400 text-white px-4 py-2 rounded'
        >
          실패 토스트
        </button>

        <TextButton type='button' text='텍스트' variant='primary' size='xl' className='w-88.5' />
        <TextButton type='button' text='텍스트' variant='semantic' size='xl' className='w-88.5' />
        <TextButton
          type='button'
          text='텍스트'
          variant='semanticOutline'
          size='xl'
          className='w-88.5'
        />
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

        <ToggleButton isChecked={isToggled} onClick={() => setIsToggled((prev) => !prev)} />

        {modalOpen && (
          <ConfirmModal
            title='해당 영양제를 섭취 중인 영양제에서'
            content='건강한 루틴이 쌓이고 있어요!'
            onConfirm={() => setModalOpen(false)}
            onCancel={() => setModalOpen(false)}
          />
        )}
        <BottomSheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <div className='bg-amber-200 rounded-2xl p-10'>테스트</div>
        </BottomSheet>

        <Input label='이메일' type='email' placeholder='이메일을 입력해주세요.' />
        <Input label='비밀번호' type='password' placeholder='비밀번호를 입력해주세요.' />

        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          onSearch={() => console.log('search:', searchValue)}
          placeholder='영양제를 검색해보세요.'
        />

        <div className='grid grid-cols-3 gap-2'>
          {healthConcernItems.map(({ id, label, icon }) => (
            <SelectionCard
              key={id}
              id={id}
              label={label}
              icon={icon}
              isSelected={selectedHealthConcern === id}
              onClick={setSelectedHealthConcern}
              className='w-full'
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamplePage;

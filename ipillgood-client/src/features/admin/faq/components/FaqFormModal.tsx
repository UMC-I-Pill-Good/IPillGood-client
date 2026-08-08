'use client';

import { useState, type FormEvent } from 'react';

import { FaqModalCloseIcon } from '@/assets';
import { ModalShell, TextButton } from '@/shared/components';

import { FAQ_FORM_CATEGORY_LIST, type FaqCategoryType } from '../constants/FaqCategory';
import type { FaqItemType } from '../types/Faq';

interface FaqFormModalProps {
  onClose: () => void;
  faq?: FaqItemType;
}

const FaqFormModal = ({ onClose, faq }: FaqFormModalProps) => {
  const [question, setQuestion] = useState(faq?.question ?? '');
  const [answer, setAnswer] = useState(faq?.answer ?? '');
  const [selectedCategory, setSelectedCategory] = useState<FaqCategoryType>(
    faq?.category ?? '추천/성분',
  );
  const modalTitle = faq ? 'FAQ 수정' : 'FAQ 추가';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClose();
  };

  return (
    <ModalShell
      ariaLabel={modalTitle}
      onClose={onClose}
      className='!w-[470px] !gap-8 !rounded-[20px] !px-5 !py-8 shadow-[4px_4px_20px_rgba(126,131,135,0.2)]'
    >
      <button
        type='button'
        aria-label={`${modalTitle} 모달 닫기`}
        onClick={onClose}
        className='self-end'
      >
        <FaqModalCloseIcon aria-hidden='true' className='size-[30px]' />
      </button>

      <form onSubmit={handleSubmit} className='flex w-full flex-col gap-8'>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-8'>
            <h2 className='text-2xl font-semibold leading-none text-black'>{modalTitle}</h2>

            <div className='flex flex-col gap-4'>
              <label className='flex flex-col gap-2 text-xl font-medium leading-none text-black'>
                질문
                <input
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  placeholder='질문을 입력하세요'
                  className='h-[45px] rounded-lg border border-neutral bg-white px-2 py-3 text-xl font-medium leading-none outline-none placeholder:text-neutral focus-visible:border-primary'
                />
              </label>

              <label className='flex flex-col gap-2 text-xl font-medium leading-none text-black'>
                답변
                <textarea
                  value={answer}
                  onChange={(event) => setAnswer(event.target.value)}
                  placeholder='답변을 입력하세요'
                  className='h-[181px] resize-none rounded-lg border border-neutral bg-white px-2 py-3 text-xl font-medium leading-none outline-none placeholder:text-neutral focus-visible:border-primary'
                />
              </label>
            </div>
          </div>

          <fieldset className='flex flex-col gap-2'>
            <legend className='mb-2 text-xl font-medium leading-none text-black'>카테고리</legend>
            <div className='flex items-center gap-2'>
              {FAQ_FORM_CATEGORY_LIST.map((category) => {
                const isSelected = category === selectedCategory;

                return (
                  <TextButton
                    key={category}
                    text={category}
                    variant={isSelected ? 'secondary' : 'assistive'}
                    size='sm'
                    onClick={() => setSelectedCategory(category)}
                    className={
                      isSelected ? 'bg-secondary px-4 hover:bg-secondary-600' : 'px-4 text-neutral'
                    }
                  />
                );
              })}
            </div>
          </fieldset>
        </div>

        <div className='flex justify-end gap-2.5'>
          <TextButton
            text='취소'
            variant='outline'
            size='sm'
            onClick={onClose}
            className='w-32 border-secondary text-secondary shadow-none'
          />
          <TextButton
            type='submit'
            text='저장'
            variant='primary'
            size='sm'
            className='w-32 shadow-[4px_4px_2px_rgba(0,0,0,0.15)]'
          />
        </div>
      </form>
    </ModalShell>
  );
};

export default FaqFormModal;

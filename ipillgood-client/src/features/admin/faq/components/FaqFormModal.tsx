'use client';

import { useState, type FormEvent } from 'react';

import { FaqModalCloseIcon } from '@/assets';
import { ModalShell, TextButton } from '@/shared/components';
import { showToast } from '@/shared/utils/toast';

import { FAQ_FORM_CATEGORY_LIST, type FaqCategoryType } from '../constants/FaqCategory';
import type { FaqFormValueType, FaqItemType } from '../types/Faq';

interface FaqFormModalProps {
  onClose: () => void;
  onSubmit: (value: FaqFormValueType) => Promise<void>;
  faq?: FaqItemType;
  isSubmitting?: boolean;
}

const FaqFormModal = ({ onClose, onSubmit, faq, isSubmitting = false }: FaqFormModalProps) => {
  const [question, setQuestion] = useState(faq?.question ?? '');
  const [answer, setAnswer] = useState(faq?.answer ?? '');
  const [selectedCategory, setSelectedCategory] = useState<FaqCategoryType>(
    faq?.category ?? '추천/성분',
  );
  const modalTitle = faq ? 'FAQ 수정' : 'FAQ 추가';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuestion = question.trim();
    const trimmedAnswer = answer.trim();

    if (!trimmedQuestion || !trimmedAnswer) {
      showToast.error('질문과 답변을 모두 입력해 주세요.');
      return;
    }

    try {
      await onSubmit({
        question: trimmedQuestion,
        answer: trimmedAnswer,
        category: selectedCategory as Exclude<FaqCategoryType, '전체'>,
      });
      onClose();
    } catch {
      // API 오류 시 입력 내용을 유지합니다.
    }
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
                  maxLength={200}
                  disabled={isSubmitting}
                  placeholder='질문을 입력하세요'
                  className='h-[45px] rounded-lg border border-neutral bg-white px-2 py-3 text-xl font-medium leading-none outline-none placeholder:text-neutral focus-visible:border-primary'
                />
              </label>

              <label className='flex flex-col gap-2 text-xl font-medium leading-none text-black'>
                답변
                <textarea
                  value={answer}
                  onChange={(event) => setAnswer(event.target.value)}
                  maxLength={2000}
                  disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
            disabled={isSubmitting}
            className='w-32 border-secondary text-secondary shadow-none'
          />
          <TextButton
            type='submit'
            text='저장'
            variant='primary'
            size='sm'
            disabled={isSubmitting}
            className='w-32 shadow-[4px_4px_2px_rgba(0,0,0,0.15)]'
          />
        </div>
      </form>
    </ModalShell>
  );
};

export default FaqFormModal;

import type { ChangeEvent } from 'react';
import { TextButton } from '@/shared/components';
import { MAX_REVIEW_IMAGE_COUNT } from '../constants/reviewForm';
import type { ReviewImagePreview } from '../types/reviewForm';
import ReviewRating from './ReviewRating';

interface ReviewFormFieldsProps {
  content: string;
  rating: number;
  imagePreviews: ReviewImagePreview[];
  submitError: string;
  isSubmitting: boolean;
  submitButtonText: string;
  onContentChange: (content: string) => void;
  onRatingChange: (rating: number) => void;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: (imageId: string) => void;
  onSubmit: () => void;
}

const ReviewFormFields = ({
  content,
  rating,
  imagePreviews,
  submitError,
  isSubmitting,
  submitButtonText,
  onContentChange,
  onRatingChange,
  onImageChange,
  onImageRemove,
  onSubmit,
}: ReviewFormFieldsProps) => (
  <section className='flex flex-col gap-5 px-5 py-5'>
    <div className='flex flex-col gap-1'>
      <h2 className='typo-title-gosanja text-[18px] font-normal leading-normal text-black'>
        만족도
      </h2>
      <ReviewRating rating={rating} onChange={onRatingChange} iconClassName='scale-150' />
      <p className='typo-caption-7 text-neutral-800'>별점을 선택해 주세요</p>
    </div>

    <div className='flex flex-col gap-2'>
      <label
        htmlFor='review-content'
        className='typo-title-gosanja text-[18px] font-normal leading-normal text-black'
      >
        후기 내용
      </label>
      <div className='relative h-38.5'>
        <textarea
          id='review-content'
          value={content}
          maxLength={300}
          placeholder='후기 내용을 입력해주세요'
          onChange={(event) => onContentChange(event.target.value)}
          className='size-full resize-none rounded-lg border border-white bg-white/60 px-2 py-2 pb-7 typo-caption-2 text-black shadow-[0_4px_4px_rgba(126,131,135,0.1)] outline-none placeholder:text-neutral-800'
        />
        <p className='pointer-events-none absolute bottom-2 right-2 typo-caption-7 text-neutral-800'>
          {content.length}/300
        </p>
      </div>
    </div>

    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-1'>
        <h2 className='typo-body-1 text-black'>사진 첨부하기</h2>
        <span className='typo-body-11 text-neutral-800'>(선택)</span>
      </div>
      <div className='flex gap-2'>
        {imagePreviews.length < MAX_REVIEW_IMAGE_COUNT && (
          <label className='flex size-25 cursor-pointer items-center justify-center rounded-lg border border-neutral-400 text-4xl font-light text-neutral-500 transition-colors hover:bg-neutral-300'>
            +
            <input
              type='file'
              accept='image/*'
              multiple
              className='sr-only'
              onChange={onImageChange}
            />
          </label>
        )}
        {imagePreviews.map((image) => (
          <button
            key={image.id}
            type='button'
            aria-label='첨부 이미지 삭제'
            className='relative flex size-25 items-center justify-center overflow-hidden rounded-lg bg-neutral-300 typo-body-2 text-neutral-800'
            onClick={() => onImageRemove(image.id)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.previewUrl} alt='후기 첨부 이미지' className='size-full object-cover' />
          </button>
        ))}
      </div>
      <p className='typo-caption-7 text-neutral-800'>최대 3개 첨부 가능</p>
    </div>

    {submitError && (
      <p role='alert' className='typo-caption-7 text-red-600'>
        {submitError}
      </p>
    )}
    <TextButton
      type='button'
      text={submitButtonText}
      size='xl'
      className='mt-2 h-13 w-full'
      disabled={isSubmitting || !content.trim() || rating === 0}
      onClick={onSubmit}
    />
  </section>
);

export default ReviewFormFields;

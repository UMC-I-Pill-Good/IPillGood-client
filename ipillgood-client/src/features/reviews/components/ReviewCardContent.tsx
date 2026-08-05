'use client';

import { useRef, useState } from 'react';
import { MoreHorizontal, ThumbsUp, UserRound } from 'lucide-react';
import { useEscapeKey, useOutsideClick } from '@/shared/hooks';
import { AGE_GROUP_LABEL, GENDER_LABEL } from '@/shared/types';
import type { RankingReviewItem } from '../types/review';
import ReviewRating from './ReviewRating';

interface ReviewCardContentProps {
  review: RankingReviewItem;
  onEdit: () => void;
  onDelete: () => void;
  onReport: () => void;
  isHelpful: boolean;
  helpfulCount: number;
  isHelpfulUpdating: boolean;
  onHelpfulToggle: () => void;
}

const ReviewCardContent = ({
  review,
  onEdit,
  onDelete,
  onReport,
  isHelpful,
  helpfulCount,
  isHelpfulUpdating,
  onHelpfulToggle,
}: ReviewCardContentProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = `review-menu-${review.reviewId}`;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEscapeKey(() => setIsMenuOpen(false));
  useOutsideClick(menuRef, () => setIsMenuOpen(false));

  const handleDelete = () => {
    setIsMenuOpen(false);
    onDelete();
  };

  return (
    <article className='glass relative flex h-auto w-full flex-col items-start gap-4 whitespace-normal rounded-5 border border-white bg-white/50 px-3 py-2 shadow-[0_4px_4px_rgba(126,131,135,0.1)]'>
      <div className='flex w-full items-start gap-2'>
        <div className='flex size-11.25 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-neutral-500 mt-2'>
          {review.profileImageUrl?.startsWith('http') ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.profileImageUrl}
              alt=''
              className='size-full rounded-full object-cover'
            />
          ) : (
            <UserRound aria-hidden='true' className='size-6' />
          )}
        </div>
        <div className='flex min-w-0 flex-1 items-start justify-between gap-3'>
          <div className='flex min-w-0 flex-col gap-1'>
            <p className='truncate typo-body-5 text-black'>{review.nickname}</p>
            <p className='typo-caption-7 text-neutral-800'>
              {AGE_GROUP_LABEL[review.ageGroup]} / {GENDER_LABEL[review.gender]}
            </p>
            <ReviewRating rating={review.rating} />
          </div>
          <p className='shrink-0 typo-caption-7 text-neutral-800'>
            {review.createdAt.slice(0, 10).replaceAll('-', '.')}
          </p>
        </div>
      </div>

      <p className='typo-caption-2 text-black'>{review.content}</p>

      {review.reviewImageUrls.length > 0 && (
        <div className='flex gap-2 overflow-x-auto hide-scrollbar'>
          {review.reviewImageUrls.map((imageUrl) => (
            <div
              key={imageUrl}
              className='flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-neutral-300 typo-body-2 text-neutral-800'
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt='후기 첨부 이미지' className='object-contain' />
            </div>
          ))}
        </div>
      )}

      <div className='flex w-full items-center justify-between gap-2'>
        <button
          type='button'
          disabled={review.mine || isHelpfulUpdating}
          className='flex items-center gap-1 text-primary-600 typo-caption-6'
          onClick={onHelpfulToggle}
        >
          <ThumbsUp
            aria-hidden='true'
            className='size-4'
            fill={isHelpful ? 'currentColor' : 'none'}
          />
          <span>도움이 됐어요</span>
          <span>{helpfulCount}</span>
        </button>

        {review.mine ? (
          <div ref={menuRef} className='relative ml-auto'>
            <button
              type='button'
              aria-label='후기 메뉴 열기'
              aria-haspopup='menu'
              aria-controls={menuId}
              aria-expanded={isMenuOpen}
              className='flex size-6 items-center justify-center text-neutral-800 py-2 rounded-full transition hover:bg-gray-200'
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
            >
              <MoreHorizontal aria-hidden='true' className='size-5' />
            </button>
            {isMenuOpen && (
              <div
                id={menuId}
                role='menu'
                className='absolute bottom-8 right-0 z-10 flex h-24 w-20.25 flex-col items-start overflow-hidden rounded-lg border border-white bg-white/80 shadow-md backdrop-blur-[20px]'
              >
                <button
                  type='button'
                  role='menuitem'
                  className='flex h-8 w-full items-center justify-center gap-1 border-b border-neutral-300 px-2 typo-caption-2 text-black'
                  onClick={onEdit}
                >
                  후기 수정
                </button>
                <button
                  type='button'
                  role='menuitem'
                  className='flex h-8 w-full items-center justify-center gap-1 border-b border-neutral-300 px-2 typo-caption-2 text-neutral-800'
                  onClick={handleDelete}
                >
                  후기 삭제
                </button>
                <button
                  type='button'
                  role='menuitem'
                  className='flex h-8 w-full items-center justify-center gap-1 px-2 typo-caption-2 text-neutral-800'
                  onClick={() => setIsMenuOpen(false)}
                >
                  취소
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            type='button'
            className='ml-auto shrink-0 text-semantic-600 typo-caption-6'
            onClick={onReport}
          >
            신고하기
          </button>
        )}
      </div>
    </article>
  );
};

export default ReviewCardContent;

import type { RefObject } from 'react';
import { MoreHorizontal, ThumbsUp, UserRound } from 'lucide-react';
import { AGE_GROUP_LABEL, GENDER_LABEL } from '@/shared/types';
import type { RankingReviewItem } from '../types/review';
import ReviewRating from './ReviewRating';

interface ReviewCardContentProps {
  review: RankingReviewItem;
  menuRef: RefObject<HTMLDivElement | null>;
  menuId: string;
  isMenuOpen: boolean;
  isHelpful: boolean;
  helpfulCount: number;
  onHelpfulToggle: () => void;
  onMenuToggle: () => void;
  onMenuClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onReport: () => void;
}

const ReviewCardContent = ({
  review,
  menuRef,
  menuId,
  isMenuOpen,
  isHelpful,
  helpfulCount,
  onHelpfulToggle,
  onMenuToggle,
  onMenuClose,
  onEdit,
  onDelete,
  onReport,
}: ReviewCardContentProps) => (
  <article className='glass relative flex h-auto w-full flex-col items-start gap-4 whitespace-normal rounded-[20px] border border-white bg-white/50 px-3 py-2 shadow-[0_4px_4px_rgba(126,131,135,0.1)]'>
    <div className='flex w-full items-start gap-2'>
      <div className='flex size-11.25 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-neutral-500'>
        {review.profileImageKey.startsWith('http') ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={review.profileImageKey} alt='' className='size-full rounded-full object-cover' />
        ) : (
          <UserRound aria-hidden='true' className='size-6' />
        )}
      </div>
      <div className='flex min-w-0 flex-1 items-start justify-between gap-3'>
        <div className='flex min-w-0 flex-col gap-1'>
          <p className='truncate typo-body-5 text-black'>{review.nickname}</p>
          <p className='typo-caption-7 text-neutral-800'>
            {AGE_GROUP_LABEL[review.reviewerAgeGroup]} / {GENDER_LABEL[review.reviewerGender]}
          </p>
          <ReviewRating rating={review.rating} />
        </div>
        <p className='shrink-0 typo-caption-7 text-neutral-800'>
          {review.createdAt.slice(0, 10).replaceAll('-', '.')}
        </p>
      </div>
    </div>

    <p className='typo-caption-2 text-black'>{review.content}</p>

    {review.imageKeys.length > 0 && (
      <div className='flex gap-2 overflow-x-auto hide-scrollbar'>
        {review.imageKeys.map((imageKey) => (
          <div
            key={imageKey}
            className='flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-neutral-300 typo-body-2 text-neutral-800'
          >
            {imageKey.startsWith('http') || imageKey.startsWith('/') ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageKey} alt='후기 첨부 이미지' className='size-full object-cover' />
            ) : (
              '사진'
            )}
          </div>
        ))}
      </div>
    )}

    <div className='flex w-full items-center justify-between gap-2'>
      <button
        type='button'
        disabled={review.mine}
        className='flex items-center gap-1 text-primary-600 typo-caption-6 disabled:cursor-not-allowed disabled:opacity-60'
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
            className='flex size-6 items-center justify-center text-neutral-800'
            onClick={onMenuToggle}
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
                onClick={onDelete}
              >
                후기 삭제
              </button>
              <button
                type='button'
                role='menuitem'
                className='flex h-8 w-full items-center justify-center gap-1 px-2 typo-caption-2 text-neutral-800'
                onClick={onMenuClose}
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

export default ReviewCardContent;

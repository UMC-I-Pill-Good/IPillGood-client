'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DropdownIcon, EmptyRatingStarIcon, FilledRatingStarIcon, MascotSadIcon } from '@/assets';
import { Check, MoreHorizontal, ThumbsUp, UserRound } from 'lucide-react';
import RankingPageHeader from '../RankingPageHeader';
import { TextButton } from '@/shared/components';
import { NavBar } from '@/shared/layout';
import { useEscapeKey, useOutsideClick, useScrollLock } from '@/shared/hooks';
import { getRankingProductReviews } from '../../api/getRankingProductReviews';
import { getRankingProductDetail } from '../../api/getRankingProductDetail';
import type { RankingReviewItem, ReviewReportReason, ReviewSort } from '../../types/rankingReview';
import type { RankingProductDetailDto } from '../../types/ranking';
import SupplementDetailSummaryCard from '../detail/SupplementDetailSummaryCard';
import DropdownOptionMenu from '../default/DropdownOptionMenu';

interface RankingReviewContainerProps {
  productId: number;
}

interface ReviewCardProps {
  review: RankingReviewItem;
  productId: number;
  onDelete: (reviewId: number) => void;
}

interface ReviewDeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const REPORT_REASONS: readonly { value: ReviewReportReason; label: string }[] = [
  { value: 'AD_PROMOTION', label: '광고 또는 홍보성 내용' },
  { value: 'ABUSE', label: '욕설 또는 비방' },
  { value: 'FALSE_INFO', label: '허위 정보 포함' },
  { value: 'PERSONAL_INFO', label: '개인정보 포함' },
  { value: 'ETC', label: '기타' },
];

const ReportCheckbox = ({ checked }: { checked: boolean }) => (
  <span
    aria-hidden='true'
    className={`inline-flex size-5 shrink-0 items-center justify-center rounded-[4px] border ${checked ? 'border-[#7E8387] bg-[#7E8387] text-white' : 'border-[#7E8387] bg-white text-transparent'}`}
  >
    <Check size={14} strokeWidth={3} />
  </span>
);

interface ReviewReportModalProps {
  onCancel: () => void;
  onSubmit: (reason: ReviewReportReason, detail: string) => void;
}

const ReviewReportModal = ({ onCancel, onSubmit }: ReviewReportModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedReason, setSelectedReason] = useState<ReviewReportReason>('AD_PROMOTION');
  const [content, setContent] = useState('');

  useScrollLock();
  useEscapeKey(onCancel);
  useOutsideClick(contentRef, onCancel);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-neutral-800/50 px-5' role='dialog' aria-modal='true'>
      <div ref={contentRef} className='flex w-full max-w-[310px] flex-col gap-4 rounded-[20px] border border-white bg-white px-5 py-6 shadow-[4px_4px_20px_rgba(126,131,135,0.2)]'>
        <h2 className='text-center typo-body-5 text-semantic-600'>신고하기</h2>
        <p className='text-center typo-caption-2 text-neutral-800'>이 후기를 신고하는 이유를 선택해 주세요.</p>
        <div className='flex flex-col gap-2'>
          {REPORT_REASONS.map((reason) => {
            const checked = selectedReason === reason.value;
            return (
              <button
                key={reason.value}
                type='button'
                className='flex items-center gap-2 text-left typo-caption-2 text-black'
                onClick={() => setSelectedReason(reason.value)}
              >
                <ReportCheckbox checked={checked} />
                <span>{reason.label}</span>
              </button>
            );
          })}
        </div>
        <div className='relative w-[270px]'>
          <textarea
            value={content}
            maxLength={200}
            onChange={(event) => setContent(event.target.value)}
            placeholder='추가 내용을 입력해 주세요 (선택사항)'
            className='h-[142px] w-full resize-none rounded-lg border border-neutral-800 p-2 typo-caption-6 text-black outline-none placeholder:text-neutral-800'
          />
          <span className='absolute bottom-3 right-3 typo-caption-7 text-neutral-800'>{content.length}/200</span>
        </div>
        <div className='flex w-[261px] items-center justify-center gap-3'>
          <TextButton type='button' text='취소' variant='semanticOutline' size='sm' className='h-8 w-[124px] shrink-0' onClick={onCancel} />
          <TextButton type='button' text='신고하기' variant='semantic' size='sm' className='h-8 w-[124px] shrink-0 shadow-[4px_4px_2px_rgba(0,0,0,0.15)]' disabled={!selectedReason} onClick={() => { if (selectedReason) onSubmit(selectedReason, content); }} />
        </div>
      </div>
    </div>
  );
};

const ReviewDeleteModal = ({ onConfirm, onCancel }: ReviewDeleteModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useScrollLock();
  useEscapeKey(onCancel);
  useOutsideClick(contentRef, onCancel);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-neutral-800/20' role='dialog' aria-modal='true'>
      <div
        ref={contentRef}
        className='flex w-77.5 flex-col overflow-hidden rounded-[20px] border border-white bg-white px-7.5 py-6 shadow-[4px_4px_40px_rgba(126,131,135,0.16)]'
      >
        <p className='mb-2 text-center typo-body-9 text-black'>작성한 후기를 정말 삭제하시겠습니까?</p>
        <p className='text-center typo-caption-6 text-semantic-600'>작성한 후기는 복구가 어렵습니다.</p>
        <div className='mt-5 flex items-center gap-2.5'>
          <TextButton
            type='button'
            text='예'
            variant='semanticOutline'
            size='sm'
            onClick={onConfirm}
            className='flex-1'
          />
          <TextButton
            type='button'
            text='아니요'
            variant='semantic'
            size='sm'
            onClick={onCancel}
            className='flex-1'
          />
        </div>
      </div>
    </div>
  );
};

interface ReviewSortDropdownProps {
  sort: ReviewSort;
  onChange: (sort: ReviewSort) => void;
}

const ReviewSortDropdown = ({ sort, onChange }: ReviewSortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sortOptions: readonly ReviewSort[] = ['LATEST', 'LIKE_COUNT_DESC'];
  const sortLabels: Record<ReviewSort, string> = {
    LATEST: '최신순',
    LIKE_COUNT_DESC: '좋아요순',
  };

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className='relative shrink-0'>
      <button
        type='button'
        className='glass flex h-8 items-center gap-1 rounded-lg bg-transparent px-2 typo-caption-2 text-neutral-800 shadow-[4px_4px_4px_rgba(155,161,255,0.1)]'
        aria-label='후기 정렬 방식'
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{sortLabels[sort]}</span>
        <DropdownIcon aria-hidden='true' className='size-6' />
      </button>
      {isOpen && (
        <DropdownOptionMenu
          options={sortOptions}
          selectedOption={sort}
          getOptionLabel={(option) => sortLabels[option]}
          onSelect={(option) => { onChange(option); setIsOpen(false); }}
          className='w-[81px]'
        />
      )}
    </div>
  );
};

const ReviewCard = ({ review, productId, onDelete }: ReviewCardProps) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isHelpful, setIsHelpful] = useState(review.helpedByMe);
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount);

  return (
  <>
  <article className='relative glass !h-auto !w-full !flex !whitespace-normal items-start flex-col gap-4 rounded-[20px] border border-white bg-white/50 px-3 py-2 shadow-[0_4px_4px_rgba(126,131,135,0.1)]'>
    <div className='flex w-full items-start gap-2'>
      <div className='flex size-[45px] shrink-0 items-center justify-center rounded-full bg-neutral-200 text-neutral-500'>
        {review.profileImageKey.startsWith('http') ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={review.profileImageKey} alt='' className='size-full rounded-full object-cover' />
        ) : (
          <UserRound aria-hidden='true' className='size-6' />
        )}
      </div>
      <div className='flex min-w-0 flex-1 items-start justify-between gap-3'>
        <div className='flex min-w-0 flex-col gap-1'>
          <p className='typo-body-5 truncate text-black'>{review.nickname}</p>
          <p className='typo-caption-7 text-neutral-800'>
            {review.reviewerAgeGroup === 'TWENTIES' ? '20대' : review.reviewerAgeGroup} / {review.reviewerGender === 'MALE' ? '남성' : '여성'}
          </p>
          <div className='flex items-center gap-1'>
            {Array.from({ length: 5 }, (_, index) => (
              index < review.rating ? (
                <FilledRatingStarIcon key={`${review.reviewId}-${index}`} aria-hidden='true' className='size-5 text-secondary-600' />
              ) : (
                <EmptyRatingStarIcon key={`${review.reviewId}-${index}`} aria-hidden='true' className='size-5 text-neutral-400' />
              )
            ))}
          </div>
        </div>
        <div className='relative flex shrink-0 items-center gap-1'>
          <p className='typo-caption-7 text-neutral-800'>{review.createdAt.slice(0, 10).replaceAll('-', '.')}</p>
        </div>
      </div>
    </div>
    <p className='typo-caption-2 text-black'>{review.content}</p>
    <div className='flex gap-2 overflow-x-auto hide-scrollbar'>
        {review.imageKeys.map((imageKey) => (
        <div key={imageKey} className='flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-neutral-300 typo-body-2 text-neutral-800'>
          {imageKey.startsWith('http') ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageKey} alt='후기 첨부 이미지' className='size-full object-cover' />
          ) : '사진'}
        </div>
      ))}
    </div>
    <div className='flex w-full items-center justify-between gap-2'>
      <button
        type='button'
        disabled={review.mine}
        className='flex items-center gap-1 text-primary-600 typo-caption-6 disabled:cursor-not-allowed disabled:opacity-60'
        onClick={() => {
          if (review.mine) return;
          setIsHelpful((current) => {
            setHelpfulCount((count) => count + (current ? -1 : 1));
            return !current;
          });
        }}
      >
        <ThumbsUp aria-hidden='true' className='size-4' fill={isHelpful ? 'currentColor' : 'none'} />
        <span>도움이 됐어요</span>
        <span>{helpfulCount}</span>
      </button>
      {review.mine ? (
        <div className='relative ml-auto'>
          <button
            type='button'
            aria-label='후기 메뉴 열기'
            aria-expanded={isMenuOpen}
            className='flex size-6 items-center justify-center text-neutral-800'
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <MoreHorizontal aria-hidden='true' className='size-5' />
          </button>
          {isMenuOpen && (
            <div className='absolute bottom-8 right-0 z-10 flex h-24 w-[81px] flex-col items-start overflow-hidden rounded-[8px] border border-white bg-white/80 shadow-md backdrop-blur-[20px]'>
            <button type='button' className='flex h-8 w-full items-center justify-center gap-1 border-b border-neutral-300 px-2 typo-caption-2 text-black' onClick={() => router.push(`/product/${productId}/reviews/${review.reviewId}/edit`)}>후기 수정</button>
              <button type='button' className='flex h-8 w-full items-center justify-center gap-1 border-b border-neutral-300 px-2 typo-caption-2 text-neutral-800' onClick={() => { setIsMenuOpen(false); setIsDeleteModalOpen(true); }}>후기 삭제</button>
              <button type='button' className='flex h-8 w-full items-center justify-center gap-1 px-2 typo-caption-2 text-neutral-800' onClick={() => setIsMenuOpen(false)}>취소</button>
            </div>
          )}
        </div>
      ) : (
        <button type='button' className='ml-auto shrink-0 text-semantic-600 typo-caption-6' onClick={() => setIsReportModalOpen(true)}>신고하기</button>
      )}
    </div>
  </article>
  {isDeleteModalOpen && (
    <ReviewDeleteModal
      onCancel={() => setIsDeleteModalOpen(false)}
      onConfirm={() => { setIsDeleteModalOpen(false); onDelete(review.reviewId); }}
    />
  )}
  {isReportModalOpen && (
    <ReviewReportModal
      onCancel={() => setIsReportModalOpen(false)}
      onSubmit={() => setIsReportModalOpen(false)}
    />
  )}
  </>
  );
};

const RankingReviewContainer = ({ productId }: RankingReviewContainerProps) => {
  const [sort, setSort] = useState<ReviewSort>('LATEST');
  const [reviews, setReviews] = useState<RankingReviewItem[]>([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [product, setProduct] = useState<RankingProductDetailDto | null>(null);

  useEffect(() => {
    let active = true;
    getRankingProductDetail(productId).then((response) => {
      if (active && response.result) setProduct(response.result);
    });
    getRankingProductReviews({ productId, sort, size: 20 }).then((response) => {
      if (active) {
        setReviews(response.result?.reviews ?? []);
        setReviewCount(response.result?.reviewCount ?? 0);
      }
    });
    return () => {
      active = false;
    };
  }, [productId, sort]);

  return (
    <main className='min-h-dvh bg-background pb-20' data-product-id={productId}>
      <RankingPageHeader title='후기 보기' />
      {product && (
        <section className='px-5 pb-2 pt-4'>
          <SupplementDetailSummaryCard product={product} showReviewButton={false} />
        </section>
      )}
      <section className='flex flex-col gap-2 px-5 py-4'>
        <div className='flex items-center justify-between'>
          <h2 className='typo-body-5 text-black'>전체 후기 <span className='typo-caption-6 text-neutral-800'>{reviewCount}개</span></h2>
          <ReviewSortDropdown sort={sort} onChange={setSort} />
        </div>
        {reviews.length === 0 ? (
          <div className='flex min-h-[520px] flex-col items-center justify-center gap-6 pb-12'>
            <MascotSadIcon aria-hidden='true' className='h-[280px] w-[220px]' />
            <p className='typo-body-6 text-primary-600'>아직 후기가 존재하지 않아요...</p>
          </div>
        ) : (
          <div className='flex flex-col gap-2'>
            {reviews.map((review) => (
              <ReviewCard
                key={review.reviewId}
                review={review}
                productId={productId}
                onDelete={(reviewId) => {
                  setReviews((current) => current.filter((item) => item.reviewId !== reviewId));
                  setReviewCount((current) => Math.max(0, current - 1));
                }}
              />
            ))}
          </div>
        )}
      </section>
      <NavBar />
    </main>
  );
};

export default RankingReviewContainer;

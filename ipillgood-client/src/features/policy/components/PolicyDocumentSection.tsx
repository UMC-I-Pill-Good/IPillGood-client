'use client';

import { usePolicyDocument } from '../hooks/usePolicyDocument';
import { DocumentCategoryType } from '../types/policy.type';

interface PolicyDocumentSectionProps {
  documentType: DocumentCategoryType;
}

const PolicyDocumentSection = ({ documentType }: PolicyDocumentSectionProps) => {
  const { data, isLoading, isError } = usePolicyDocument(documentType);
  const { content, effectiveAt } = data ?? {};
  const formattedDate = effectiveAt?.slice(0, 10).replaceAll('-', '.');

  // 임시 (UI 미정)
  if (isError || (!isLoading && !data)) {
    return (
      <section className='flex flex-col px-5 py-4 gap-8 pb-25.5'>
        <p className='typo-caption-1 text-neutral-800'>문서를 불러오지 못했습니다.</p>
      </section>
    );
  }

  return (
    <section className='flex flex-col px-5 py-4 gap-8 pb-25.5'>
      {isLoading ? (
        <div className='w-24 h-3.5 rounded animate-pulse bg-neutral-100' />
      ) : (
        <p className='typo-caption-1 text-neutral-800'>
          최종 업데이트: <time dateTime={effectiveAt}>{formattedDate}</time>
        </p>
      )}
      {isLoading ? (
        <div className='h-40 rounded-[20px] animate-pulse bg-neutral-100' />
      ) : (
        <article className='bg-white px-3 py-4 rounded-[20px] text-black whitespace-pre-wrap'>
          {content}
        </article>
      )}
    </section>
  );
};

export default PolicyDocumentSection;

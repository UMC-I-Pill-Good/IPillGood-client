'use client';

import { CheckboxButton, TextButton } from '@/shared/components';
import { useRouter } from 'next/navigation';
import { usePolicyDocument } from '../hooks/usePolicyDocument';
import { DocumentCategoryType } from '../types/policy.type';
import { useAgreementStore } from '@/features/signup/stores/useAgreementStore';
import { agreementKeyByDocumentType } from '../constants/policy.constants';

interface PolicyDocumentSectionProps {
  documentType: DocumentCategoryType;
  isSignup?: boolean;
}

const PolicyDocumentSection = ({ documentType, isSignup }: PolicyDocumentSectionProps) => {
  const router = useRouter();

  const { data, isLoading, isError } = usePolicyDocument(documentType);
  const { content, effectiveAt } = data ?? {};

  const formattedDate = effectiveAt?.slice(0, 10).replaceAll('-', '.');

  // 동의 상태 공유
  const checked = useAgreementStore((state) => state.checked);
  const toggle = useAgreementStore((state) => state.toggle);

  const agreementKey = agreementKeyByDocumentType[documentType];
  const isChecked = checked[agreementKey];

  // 임시 (UI 미정)
  if (isError || (!isLoading && !data)) {
    return (
      <section className='flex flex-col px-5 py-4 gap-8'>
        <p className='typo-caption-1 text-neutral-800'>문서를 불러오지 못했습니다.</p>
      </section>
    );
  }

  return (
    <section className='flex h-[calc(100dvh-4.375rem)] flex-col overflow-hidden px-5 py-4'>
      {isSignup ? (
        <p className='shrink-0 typo-caption-1 text-neutral-800 mb-8'>
          {data?.title}을 위해 동의해 주세요
        </p>
      ) : (
        <p className='shrink-0 typo-caption-1 text-neutral-800 mb-8'>
          최종 업데이트: <time dateTime={effectiveAt}>{formattedDate}</time>
        </p>
      )}

      {isSignup && <p className='typo-body-5 mb-2'>{data?.title}</p>}

      {isLoading ? (
        <div className='min-h-0 flex-1 animate-pulse rounded-[20px] bg-neutral-100' />
      ) : (
        <article className='min-h-0 flex-1 overflow-y-auto thin-scrollbar rounded-[20px] bg-white px-3 py-4 whitespace-pre-wrap leading-5 text-black mb-4'>
          {content}
        </article>
      )}

      {isSignup && (
        <section className='shrink-0 space-y-4'>
          <div className='bg-white/50 h-11 p-4 rounded-xl glass w-full flex items-center justify-start gap-2'>
            <CheckboxButton
              ariaLabel='위 내용에 동의합니다'
              checked={isChecked}
              onClick={() => toggle(agreementKey)}
              size='lg'
            />
            <p className='typo-body-9'>위 내용에 동의합니다</p>
          </div>

          <TextButton
            text='확인'
            size='xl'
            className='w-full'
            disabled={!isChecked}
            onClick={() => router.back()}
          />
        </section>
      )}
    </section>
  );
};

export default PolicyDocumentSection;

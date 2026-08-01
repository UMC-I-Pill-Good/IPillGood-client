'use client';

import { TextButton } from '@/shared/components';
import FaqAccordion from './FaqAccordion';
import ContactSection from './ContactSection';
import { useRouter } from 'next/navigation';
import { useSupport } from '../../hooks/useSupport';

const InquirySection = () => {
  const router = useRouter();
  const { data } = useSupport();
  const { faqs, contactEmail, operatingHours, closedDays } = data ?? {};

  return (
    <section className='px-5 pt-4 flex flex-col flex-1 pb-20'>
      <FaqAccordion faqList={faqs ?? []} title='자주 묻는 질문 (FAQ)' />

      <TextButton
        type='button'
        text='모든 FAQ 보기'
        onClick={() => {
          router.push('/my/inquiry/faq');
        }}
        size='xl'
        className='w-full mt-4'
      />

      {/* 문의하기 */}
      <ContactSection
        contactEmail={contactEmail ?? ''}
        operatingHours={operatingHours}
        closedDays={closedDays}
      />
    </section>
  );
};

export default InquirySection;

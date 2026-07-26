'use client';

import { TextButton } from '@/shared/components';
import { mockFaqList } from '../../mocks/faq.mock';
import FaqAccordion from './FaqAccordion';
import ContactSection from './ContactSection';
import { useRouter } from 'next/navigation';

const InquirySection = () => {
  const router = useRouter();

  return (
    <section className='px-5 pt-4 flex flex-col flex-1 pb-20'>
      {/* TODO: 질문 리스트 연동 */}
      <FaqAccordion faqList={mockFaqList.slice(0, 3)} title='자주 묻는 질문 (FAQ)' />

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
      <ContactSection />
    </section>
  );
};

export default InquirySection;

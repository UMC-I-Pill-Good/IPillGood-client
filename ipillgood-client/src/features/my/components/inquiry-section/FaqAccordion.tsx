'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronRight } from 'lucide-react';
import SectionCard from '../SectionCard';
import type { FaqItemType } from '../../types/faq.type';
import { QuestionIcon } from '@/assets';

interface FaqAccordionProps {
  faqList: FaqItemType[];
  title?: string;
}

const FaqAccordion = ({ faqList, title }: FaqAccordionProps) => {
  return (
    <SectionCard title={title}>
      <Accordion.Root type='multiple' className='divide-y divide-neutral-300'>
        {faqList.map((faq) => (
          <Accordion.Item key={faq.faqId} value={String(faq.faqId)}>
            <Accordion.Header className='data-[state=open]:border-b data-[state=open]:border-neutral-300'>
              <Accordion.Trigger className='group flex w-full items-center p-4 justify-between transition-colors hover:bg-neutral-100 active:bg-neutral-200'>
                <QuestionIcon />
                <span className='flex-1 text-left typo-body-10 text-black ml-2 mr-1'>
                  {faq.question}
                </span>
                <ChevronRight
                  size={24}
                  className='shrink-0 text-neutral-800 transition-transform duration-200 group-data-[state=open]:rotate-90'
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className='overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'>
              <p className='px-4 py-3 typo-caption-6 text-neutral-800 leading-4!'>{faq.answer}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </SectionCard>
  );
};

export default FaqAccordion;

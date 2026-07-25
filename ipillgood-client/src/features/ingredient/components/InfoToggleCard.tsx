'use client';

import { useState } from 'react';

interface InfoToggleCardProps {
  title: string;
  icon: React.ReactNode;
  items: string[];
}

const InfoToggleCard = ({ title, icon, items }: InfoToggleCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className='pt-2.5 pl-3.5 pr-2.75 pb-3 bg-linear-[135deg] from-primary-600/10 to-primary-600/20 rounded-[20px] shadow-[0px_4px_4px_0px_rgba(126,131,135,0.1),inset_-2px_-2px_4px_0px_rgba(0,0,0,0.03)] '>
      <div className='flex justify-between items-start h-18'>
        <h2 className='whitespace-pre-line typo-body-6 text-primary-700'>{title}</h2>
        <button
          type='button'
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          className='typo-caption-7 text-neutral-800'
        >
          {isExpanded ? '그만 보기' : '자세히 보기'}
        </button>
      </div>
      <div className='mt-4 flex justify-end'>{icon}</div>

      {isExpanded && (
        <ul className='mt-4 flex flex-col gap-1 text-black typo-caption-7 leading-4!'>
          {items.map((item, index) => (
            <li key={index} className='flex items-start'>
              <span className='w-0.5 h-0.5 rounded-full bg-black ml-0.5 mr-2.5 mt-2 shrink-0' />
              {item}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};

export default InfoToggleCard;

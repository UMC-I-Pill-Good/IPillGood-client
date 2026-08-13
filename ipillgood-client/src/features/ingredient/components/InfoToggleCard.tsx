'use client';

import { KeyboardEvent, ReactNode, useState } from 'react';

interface InfoToggleCardProps {
  title: string;
  icon: ReactNode;
  items: string[];
}

const InfoToggleCard = ({ title, icon, items }: InfoToggleCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => setIsExpanded((prev) => !prev);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    handleToggleExpand();
  };

  return (
    <article
      role='button'
      tabIndex={0}
      onClick={handleToggleExpand}
      onKeyDown={handleKeyDown}
      aria-expanded={isExpanded}
      className='pt-2.5 pl-3.5 pr-2.75 pb-3 bg-linear-[135deg] from-point-200/50 to-point-200/70 rounded-[20px] shadow-[0px_4px_4px_0px_rgba(126,131,135,0.1),inset_-2px_-2px_4px_0px_rgba(0,0,0,0.03)] cursor-pointer'
    >
      <div className='flex justify-between items-start h-18'>
        <h2 className='whitespace-pre-line typo-body-6 text-black'>{title}</h2>
        <span className='typo-caption-7 text-neutral-800'>
          {isExpanded ? '그만 보기' : '자세히 보기'}
        </span>
      </div>
      <div className='mt-4 flex justify-end'>{icon}</div>

      {isExpanded && (
        <ul className='mt-4 flex flex-col gap-1 text-black typo-caption-3 leading-4!'>
          {items.map((item, index) => (
            <li key={index} className='flex items-start'>
              <span className='w-0.75 h-0.75 rounded-full bg-black ml-0.5 mr-2.5 mt-2 shrink-0' />
              {item}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};

export default InfoToggleCard;

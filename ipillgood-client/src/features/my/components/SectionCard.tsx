interface SectionCardProps {
  title?: string;
  children: React.ReactNode;
}

const SectionCard = ({ title, children }: SectionCardProps) => {
  return (
    <section className='flex flex-col gap-2'>
      {title && <h2 className='text-black text-[18px] typo-title-gosanja'>{title}</h2>}
      <div className='flex flex-col bg-white rounded-[20px] divide-y divide-neutral-300 overflow-hidden'>
        {children}
      </div>
    </section>
  );
};

export default SectionCard;

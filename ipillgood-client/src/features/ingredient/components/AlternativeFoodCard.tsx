interface AlternativeFoodCardProps {
  title: string;
  desc: string;
}

const AlternativeFoodCard = ({ title, desc }: AlternativeFoodCardProps) => {
  return (
    <div className='flex w-full flex-col items-center gap-5 rounded-[10px] bg-secondary-600/25 px-2.75 py-[24.5px] text-center shadow-[0_4px_4px_0_rgba(126,131,135,0.1)] backdrop-blur-xl'>
      <p className='typo-caption-2 truncate text-black'>{title}</p>
      <p className='typo-caption-6 leading-4! text-neutral-800'>{desc}</p>
    </div>
  );
};

export default AlternativeFoodCard;

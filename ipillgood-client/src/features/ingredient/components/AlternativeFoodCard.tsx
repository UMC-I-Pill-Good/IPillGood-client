interface AlternativeFoodCardProps {
  title: string;
  desc: string;
}

const AlternativeFoodCard = ({ title, desc }: AlternativeFoodCardProps) => {
  return (
    <div className='flex w-full flex-col items-center gap-2 rounded-[10px] bg-linear-[135deg] from-secondary-600/15 to-secondary-600/25  py-[24.5px] text-center px-2 shadow-[0px_4px_4px_0px_rgba(126,131,135,0.1),inset_-2px_-2px_4px_0px_rgba(0,0,0,0.02)] backdrop-blur-xl'>
      <p className='typo-caption-2 truncate text-black'>{title}</p>
      <p className='typo-caption-6 leading-4! text-neutral-800'>
        100g 당<br />
        해당 성분 {desc}
      </p>
    </div>
  );
};

export default AlternativeFoodCard;

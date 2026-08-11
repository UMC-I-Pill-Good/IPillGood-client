import Image from 'next/image';

interface IngredientSummaryCardProps {
  name: string;
  imageUrl: string;
  description: string;
}

const IngredientSummaryCard = ({ name, imageUrl, description }: IngredientSummaryCardProps) => {
  return (
    <section
      className='flex items-center gap-4 pl-7.5 pr-9.5 py-6 bg-linear-[135deg] from-primary-600/15 to-primary-600/20 rounded-[20px] shadow-[0px_4px_4px_0px_rgba(126,131,135,0.1),inset_-2px_-2px_3px_0px_rgba(0,0,0,0.04)]
'
    >
      <div className='relative w-11.25 h-17.5 shrink-0'>
        <Image src={imageUrl} alt={name} fill className='object-contain' />
      </div>

      <p className='typo-caption-2 text-neutral-900'>
        <span className='text-black'>{name}</span>
        {description.slice(name.length)}
      </p>
    </section>
  );
};

export default IngredientSummaryCard;

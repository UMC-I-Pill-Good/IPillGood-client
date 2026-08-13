import Image from 'next/image';

interface IngredientSummaryCardProps {
  name: string;
  imageUrl: string;
  description: string;
}

const IngredientSummaryCard = ({ name, imageUrl, description }: IngredientSummaryCardProps) => {
  return (
    <section className='flex flex-col justify-center items-center gap-3 mb-2'>
      <div className='flex items-center justify-center bg-white rounded-lg w-37.5 h-37.5'>
        <Image
          src={imageUrl}
          alt={name}
          width={110}
          height={110}
          className='h-27.5 w-20 shrink-0'
        />
      </div>

      <section className='mt-1 p-3 bg-linear-[135deg] from-primary-600/15 to-primary-600/20 rounded-[20px] shadow-[0px_4px_4px_0px_rgba(126,131,135,0.1),inset_-2px_-2px_3px_0px_rgba(0,0,0,0.04)]'>
        <h2 className='text-primary-700 typo-body-6 mb-1'>성분 설명</h2>
        <p className='typo-caption-2 text-black ml-2'>
          {name}
          {description.slice(name.length)}
        </p>
      </section>
    </section>
  );
};

export default IngredientSummaryCard;

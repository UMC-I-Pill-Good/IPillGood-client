interface IngredientEffectSectionProps {
  effects: string[];
}

const IngredientEffectSection = ({ effects }: IngredientEffectSectionProps) => {
  const displayEffects = effects.length > 0 ? effects : ['정보 없음'];

  return (
    <section className='mt-2 flex flex-col p-3 bg-linear-[135deg] from-[#4680fe]/10 to-[#4680fe]/15 rounded-[20px] shadow-[0px_4px_4px_0px_rgba(126,131,135,0.1),inset_-2px_-2px_4px_0px_rgba(0,0,0,0.04)] gap-1'>
      <h2 className='text-primary-700 typo-body-6'>효능</h2>
      {/* ::marker는 margin을 지원하지 않아 list-style 대신 불렛을 직접 렌더링 */}
      <ul className='flex flex-col gap-1'>
        {displayEffects.map((effect) => (
          <li key={effect} className='flex items-center text-neutral-900 typo-caption-2'>
            <span className='w-0.75 h-0.75 rounded-full bg-neutral-900 mx-2.5' />
            {effect}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientEffectSection;

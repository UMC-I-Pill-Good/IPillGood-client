const ServiceTermSection = () => {
  return (
    <section className='flex flex-col px-5 py-4 gap-8'>
      <p className='typo-caption-1 text-neutral-800'>
        최종 업데이트 <time dateTime='2026-07-13'>2026.07.13</time>
      </p>
      {/* 임시 높이 지정 */}
      <article className='bg-white px-3 py-4 rounded-[20px] h-195'>이용약관 내용</article>
    </section>
  );
};

export default ServiceTermSection;

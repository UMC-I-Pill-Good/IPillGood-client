'use client';

import { MascotBigIcon } from '@/assets';
import { TextButton } from '@/shared/components';

const AboutSection = () => {
  return (
    <section className='flex flex-col flex-1 items-center px-5 pt-10 [@media(min-height:800px)]:pt-22 pb-28.5'>
      <MascotBigIcon />
      <p className='[@media(min-height:800px)]:mt-15 mb-1 text-[16px] typo-title-gosanja text-black mt-8'>
        아필굿은 개인 맞춤 영양 성분 추천을 통해
      </p>
      <p className='text-[16px] typo-title-gosanja text-black mb-10 [@media(min-height:800px)]:mb-26'>
        <span className='text-primary-700'>건강한 습관</span>을 만들어가는 서비스입니다.
      </p>

      <div className='flex flex-col gap-2 w-full mt-auto'>
        <TextButton
          href='https://grandiose-front-c83.notion.site/3b72a4a6a3d0800f8a06f20ff0a3d838?source=copy_link'
          target='_blank'
          rel='noopener noreferrer'
          text='서비스 소개 (Notion)'
          size='xl'
          className='w-full'
        />
        <TextButton
          href='https://grandiose-front-c83.notion.site/3b72a4a6a3d080aa820fccccacd70c5f?source=copy_link'
          target='_blank'
          rel='noopener noreferrer'
          text='오픈소스 기술 (Notion)'
          size='xl'
          className='w-full'
        />
      </div>
    </section>
  );
};

export default AboutSection;

'use client';

import { MascotBigIcon } from '@/assets';
import { TextButton } from '@/shared/components';

const AboutSection = () => {
  return (
    <section className='flex flex-col flex-1 items-center px-5 pt-22 pb-28.5'>
      <MascotBigIcon />
      <p className='mt-15 mb-1 typo-body-6 text-black'>아필굿은 개인 맞춤 영양 성분 추천을 통해</p>
      <p className='typo-body-6 text-black mb-26'>
        <span className='text-primary-700'>건강한 습관</span>을 만들어가는 서비스입니다.
      </p>

      <div className='flex flex-col gap-2 w-full mt-auto'>
        <TextButton
          type='button'
          onClick={() =>
            window.open(
              'https://grandiose-front-c83.notion.site/3b72a4a6a3d0800f8a06f20ff0a3d838?source=copy_link',
              '_blank',
              'noopener,noreferrer',
            )
          }
          text='서비스 소개 (Notion)'
          size='xl'
          className='w-full'
        />
        <TextButton
          type='button'
          onClick={() =>
            window.open(
              'https://grandiose-front-c83.notion.site/3b72a4a6a3d080aa820fccccacd70c5f?source=copy_link',
              '_blank',
              'noopener,noreferrer',
            )
          }
          text='오픈소스 기술 (Notion)'
          size='xl'
          className='w-full'
        />
      </div>
    </section>
  );
};

export default AboutSection;

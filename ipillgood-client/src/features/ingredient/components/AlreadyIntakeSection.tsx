'use client';

import { TextButton } from '@/shared/components';

const AlreadyIntakeSection = () => {
  return (
    <section>
      <h2 className='typo-body-1 text-black whitespace-pre-line'>이미 챙기고 계셨네요!</h2>
      <p className='typo-caption-6 text-neutral-800 mt-2 whitespace-pre-line leading-4!'>
        마그네슘 관련 영양제가 이미 캐비닛에 섭취 중인 영양제로
        <br /> 등록되어 있어요. <br />
        <span className='text-point-900'>꾸준히 잘 챙기고 계세요!</span>
      </p>

      <TextButton
        type='button'
        variant='primary'
        size='xl'
        text='캐비닛에서 확인하기'
        className='w-full mt-5.5 mb-4'
        href='/cabinet'
      />
    </section>
  );
};

export default AlreadyIntakeSection;

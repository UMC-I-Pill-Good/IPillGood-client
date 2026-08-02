import { TextButton } from '@/shared/components';
import Image from 'next/image';
import mascotImage from '@/assets/images/mascot.png';

const SignupCompleteStep = () => {
  return (
    <section className='flex flex-1 flex-col items-center justify-center'>
      <div className='flex pt-24 flex-col items-center justify-center'>
        <Image src={mascotImage} alt='마스코트' className='w-50 h-auto' priority />

        <h3 className='text-primary-600 typo-subtitle-4 pt-28'>회원가입이 완료되었습니다!</h3>
        <p className='text-neutral-700 typo-body-2 pt-4.5 text-center'>
          아필굿과 함께 <br className='py-3' /> 건강한 루틴을 시작해 보아요!
        </p>
      </div>

      <TextButton text='로그인하러 가기' size='xl' className='w-full mt-auto' href='/login' />
    </section>
  );
};

export default SignupCompleteStep;

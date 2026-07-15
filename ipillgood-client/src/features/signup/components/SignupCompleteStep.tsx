import { TextButton } from '@/shared/components';
import Image from 'next/image';
import mascotImage from '../../../assets/images/mascot.png';

const SignupCompleteStep = ({ onRouter }: { onRouter: () => void }) => {
  return (
    <section className='flex flex-1 flex-col items-center justify-center py-2.5'>
      <div className='flex pt-22 flex-col items-center justify-center'>
        <Image src={mascotImage} alt='마스코트' className='w-50 h-auto' />

        <h3 className='text-primary-500 typo-subtitle-4 pt-28'>회원가입이 완료되었습니다!</h3>
        <p className='text-neutral-700 typo-body-2 pt-4.5 text-center'>
          아필굿과 함께 <br className='py-3' /> 건강한 루틴을 시작해 보아요!
        </p>
      </div>

      <TextButton
        type='submit'
        text='초기 설문 시작하기'
        size='xl'
        className='w-full mt-auto'
        onClick={onRouter}
      />
    </section>
  );
};

export default SignupCompleteStep;

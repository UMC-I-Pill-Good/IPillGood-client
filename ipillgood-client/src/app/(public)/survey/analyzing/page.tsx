import { Background } from '@/app/(public)/(landing)/ui/Background';
import Image from 'next/image';
import ManhwaImage from '@/assets/images/manhwa.png';

const SurveyAnalyzePage = () => {
  return (
    <main className='relative isolate flex h-screen justify-center overflow-hidden bg-[linear-gradient(225deg,#CBD6FF_0%,#92A8FF_59%,#92A8FF_80%,#7590ff_100%)] p-5'>
      <Background />

      <section className='z-10 mt-20 flex flex-col items-center text-center'>
        <p className='text-[#6580EE] typo-body-10 mb-3'>Pill Good? Feel Good!!</p>
        <p className='typo-subtitle-4 text-center text-white mb-20'>
          <span className='block leading-normal'>
            <span className='text-[#6580EE]'>누누 님</span>에게 딱 맞는 영양제를
            <br />
            고르고 있어요.
          </span>

          <span className='leading-normal block'>잠시만 기다려 주세요!</span>
        </p>

        <Image src={ManhwaImage} alt='4컷 만화' priority />
      </section>
    </main>
  );
};

export default SurveyAnalyzePage;

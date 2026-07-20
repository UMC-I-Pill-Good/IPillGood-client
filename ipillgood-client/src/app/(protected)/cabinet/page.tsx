import { TextButton } from '@/shared/components';
import { Header } from '@/shared/layout';
import Image from 'next/image';
import { cabinetItems } from '@/features/cabinet/mocks/cabinet.mocks';
import { EmptyBottleIcon } from '@/assets';
import Link from 'next/link';
import { Plus } from 'lucide-react';

const MAX_COUNT = 9;

const CabinetPage = () => {
  const slots = Array.from({ length: MAX_COUNT }, (_, index) => cabinetItems[index]);

  return (
    <main className=''>
      <Header showBackButton={false} title='내 캐비닛' />

      <p className='typo-body-10 px-5 py-4'>
        <span className='text-[#6580EE] typo-body-1'>누누님</span>이 소유 중인 영양제를 한 눈에
        확인해 보세요!
      </p>
      <div className='flex items-center justify-end gap-1 px-5 pb-4'>
        <TextButton type='button' text='섭취 중인 영양제 추가' size='sm' className='px-3' />
        <TextButton type='button' text='영양제 삭제' variant='outline' size='sm' className='px-3' />
      </div>

      <section className='no-center-glass grid grid-cols-3 gap-4 rounded-[20px] bg-white/20 mx-5 px-5 py-4 shadow-[4px_4px_20px_rgba(155,161,255,0.3),inset_4px_4px_4px_rgba(255,255,255,0.2)]'>
        {slots.map((item, index) =>
          item ? (
            <Link
              key={item.id}
              href='/'
              className='flex items-center justify-center rounded-[20px] bg-[#F5F6FF]/20 h-35 transition hover:brightness-90 shadow-[inset_4px_4px_20px_rgba(155,161,255,0.2),4px_4px_4px_rgba(255,255,255,0.2)]'
            >
              <Image src={item.image} alt={item.name} className='h-fit w-23' priority />
            </Link>
          ) : (
            <Link
              key={`empty-${index}`}
              href='/'
              className='flex items-center justify-center rounded-[20px] transition hover:brightness-90 bg-[#F5F6FF]/20 shadow-[inset_4px_4px_20px_rgba(155,161,255,0.2),4px_4px_4px_rgba(255,255,255,0.2)]'
            >
              <div className='relative translate-y-1'>
                <EmptyBottleIcon className='mb-2 text-[#D7D7D7]' />
                <div className='absolute left-1/2 -translate-x-1/2 top-11 flex flex-col items-center justify-center text-neutral-800 gap-1'>
                  <Plus size={16} />
                </div>
              </div>
            </Link>
          ),
        )}
      </section>
    </main>
  );
};

export default CabinetPage;

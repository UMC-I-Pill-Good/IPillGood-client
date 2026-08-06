import Link from 'next/link';
import SupplementBottleList from './SupplementBottleList';
import { Plus } from 'lucide-react';
import { BellGreyIcon, SupplementBottleIcon } from '@/assets';

const IntakeSupplementSection = () => {
  return (
    <section className='w-full flex flex-col gap-2 mt-4'>
      <article className='flex items-end justify-between'>
        <h2 className='typo-body-5 text-black leading-tight! mt-2.75'>섭취 중인 영양제</h2>
        {/* 알림 설정 */}
        {/* TODO: hover 임시 UI */}
        <Link
          href='/my/settings/notifications'
          className='flex items-center text-neutral-800 h-8 typo-caption-6 px-3 rounded-full bg-linear-[145deg] from-white via-white/40 to-white/10 shadow-[0px_4px_4px_0px_rgba(126,131,135,0.10),inset_-2px_-3px_3px_-1px_rgba(0,0,0,0.03)] border-white border transition hover:from-white/10 hover:via-white/40 hover:to-white'
        >
          <BellGreyIcon />
          <span>알림 설정</span>
        </Link>
      </article>

      <section className='flex gap-2 pl-3.25 pr-4.25 pb-[7.5px] rounded-[20px] home-card-glass'>
        {/* 섭취 중인 영양제 목록 */}
        <SupplementBottleList />

        {/* 내 캐비닛 페이지로 이동 */}
        <Link
          href='/cabinet/intake-add'
          className='w-17.5 h-26.25 mt-[9.5px] bg-[#F5F6FF]/20 rounded-2xl transition hover:brightness-90 px-3.5 py-4.5 shadow-[4px_4px_4px_0px_rgba(255,255,255,0.2),inset_4px_4px_20px_0px_rgba(155,161,255,0.2)]'
        >
          <div className='relative'>
            <SupplementBottleIcon width={43} height={70} />
            <div className='absolute left-1/2 -translate-x-1/2 top-7 flex flex-col items-center justify-center text-neutral-800 gap-1'>
              <Plus size={12} />
              <span className='typo-caption-6 leading-none!'>추가</span>
            </div>
          </div>
        </Link>
      </section>
    </section>
  );
};

export default IntakeSupplementSection;

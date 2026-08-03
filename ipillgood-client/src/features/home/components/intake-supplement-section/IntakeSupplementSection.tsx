'use client';

import Link from 'next/link';
import SupplementBottleList from './SupplementBottleList';
import { Bell, Plus } from 'lucide-react';
import { SupplementBottleIcon } from '@/assets';
import { ConfirmModal } from '@/shared/components';
import { useIntakeSupplement } from '../../hooks/useIntakeSupplement';

const IntakeSupplementSection = () => {
  const { list, deleteTargetId, setDeleteTargetId, handleDeleteConfirm } = useIntakeSupplement();

  return (
    <section className='w-full flex flex-col gap-1 mt-4'>
      <article className='flex items-center justify-between'>
        <h2 className='typo-body-5 text-black'>섭취 중인 영양제</h2>
        {/* 알림 설정 */}
        <Link
          href='/my/settings/notifications'
          className='relative flex items-center text-neutral-800 typo-caption-6 gap-0.5 h-8 px-3 rounded-full glass bg-white/10'
        >
          <Bell size={15} className='relative' />
          <span className='relative'>알림 설정</span>
        </Link>
      </article>
      <section className='flex gap-3 px-8 pt-5 pb-4 rounded-[20px] border border-white bg-white/50 items-center shadow-[0px_4px_4px_0px_rgba(126,131,135,0.10)]'>
        {/* 섭취 중인 영양제 목록 */}
        <SupplementBottleList list={list} onDeleteClick={setDeleteTargetId} />

        {/* 캐비닛 페이지로 이동 */}
        <Link href='/cabinet/supplement-add' className='transition hover:brightness-90'>
          <div className='relative'>
            <SupplementBottleIcon width={43} height={70} />
            <div className='absolute left-1/2 -translate-x-1/2 top-7 flex flex-col items-center justify-center text-neutral-800 gap-1'>
              <Plus size={12} />
              <span className='typo-caption-6 leading-none!'>추가</span>
            </div>
          </div>
        </Link>
      </section>
      {deleteTargetId !== null && (
        <ConfirmModal
          title={
            <>
              해당 영양제를 섭취 중인
              <br />
              영양제에서 <span className='text-semantic-600'>삭제</span>
              하시겠습니까?
            </>
          }
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTargetId(null)}
        />
      )}
    </section>
  );
};

export default IntakeSupplementSection;

'use client';

import InteractionWarningModal from '@/features/cabinet/components/modal/InteractionWarningModal';
import SupplementCard from '@/features/cabinet/components/supplement-add/SupplementCard';
import { supplementList } from '@/features/cabinet/mocks/supplement.mocks';
import { SearchBar, TextButton } from '@/shared/components';
import DropdownMenu from '@/shared/components/DropdownMenu';
import FilterBottomSheet from '@/shared/components/modal/FilterBottomSheet';
import { Header } from '@/shared/layout';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const SORT_OPTIONS = ['후기 많은 순', '평점 높은 순'] as const;

const AGE_OPTIONS = ['전체', '10대', '20대', '30대', '40대', '50대 이상'];
const GENDER_OPTIONS = ['전체', '남성', '여성'];
const HEALTH_OPTIONS = [
  '신경계',
  '감각계',
  '소화 대사계',
  '내분비계',
  '심혈관계',
  '신체방어 및 면역계',
  '근육계',
  '생식 및 비뇨계',
];

type DraftFilters = {
  ageGroup: string;
  gender: string | undefined;
  certification: string;
  healthConcern: string | null;
};

const SupplementAddPage = () => {
  const [value, setValue] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [draftFilters, setDraftFilters] = useState<DraftFilters>({
    ageGroup: '전체',
    gender: undefined,
    certification: 'ALL',
    healthConcern: null,
  });

  const [sort, setSort] = useState('후기 많은 순');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

  const toggle = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  const filterGroups = [
    {
      title: '연령대',
      options: AGE_OPTIONS.map((option) => ({
        label: option,
        isSelected: draftFilters.ageGroup === option,
        onClick: () =>
          setDraftFilters((prev) => ({
            ...prev,
            ageGroup: option,
          })),
      })),
    },
    {
      title: '성별',
      options: GENDER_OPTIONS.map((option) => ({
        label: option,
        isSelected: draftFilters.gender === option,
        onClick: () =>
          setDraftFilters((prev) => ({
            ...prev,
            gender: option,
          })),
      })),
    },
    {
      title: '식약처 인증',
      options: [
        {
          label: '인증 제품만',
          isSelected: draftFilters.certification === 'CERTIFIED',
          onClick: () =>
            setDraftFilters((prev) => ({
              ...prev,
              certification: prev.certification === 'CERTIFIED' ? 'ALL' : 'CERTIFIED',
            })),
        },
      ],
    },
    {
      title: '건강 고민',
      optionRows: [
        HEALTH_OPTIONS.slice(0, 3),
        HEALTH_OPTIONS.slice(3, 6),
        HEALTH_OPTIONS.slice(6),
      ].map((row) =>
        row.map((option) => ({
          label: option,
          isSelected: draftFilters.healthConcern === option,
          onClick: () =>
            setDraftFilters((prev) => ({
              ...prev,
              healthConcern: option,
            })),
        })),
      ),
    },
  ];

  return (
    <main className='flex min-h-dvh flex-col pb-24'>
      <Header title='영양제 이름' />
      <p className='typo-body-10 px-5 py-4'>캐비닛에 추가하고 싶은 영양제를 선택해 주세요.</p>
      <div className='px-5 pb-4'>
        <SearchBar
          value={value}
          onChange={setValue}
          placeholder='영양제를 검색해주세요.'
          onFilter={() => setIsFilterOpen(true)}
          className='h-12.5'
        />
      </div>

      <section className=' px-5 py-4'>
        <article className='flex items-center justify-between'>
          <p className='typo-body-5'>{value || '전체'} 제품 목록</p>

          <div className='relative'>
            <button
              type='button'
              aria-label='정렬 방식'
              onClick={() => setIsSortOpen((prev) => !prev)}
              className='flex h-8 items-center glass text-neutral typo-caption-2'
            >
              {sort}
              <ChevronDown className={clsx(' transition-transform', isSortOpen && 'rotate-180')} />
            </button>

            {isSortOpen && (
              <DropdownMenu
                options={[...SORT_OPTIONS]}
                value={sort}
                onSelect={(value) => {
                  setSort(value);
                  setIsSortOpen(false);
                }}
                onClose={() => setIsSortOpen(false)}
                buttonClassName='typo-caption-2'
              />
            )}
          </div>
        </article>

        <article className='mt-2 space-y-2'>
          {supplementList.map((item) => (
            <SupplementCard
              key={item.id}
              item={item}
              checked={selectedIds.includes(item.id)}
              onCheck={() => toggle(item.id)}
            />
          ))}
        </article>
      </section>
      <FilterBottomSheet
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        groups={filterGroups}
        onReset={() =>
          setDraftFilters({
            ageGroup: '전체',
            gender: '전체',
            certification: 'ALL',
            healthConcern: null,
          })
        }
        onApply={() => {
          setIsFilterOpen(false);
        }}
      />
      <section className='px-5 mt-auto'>
        <TextButton
          type='button'
          text='캐비닛에 추가하기'
          size='xl'
          className='w-full'
          onClick={() => setIsWarningModalOpen(true)}
        />
      </section>

      {isWarningModalOpen && (
        <InteractionWarningModal
          onCancel={() => setIsWarningModalOpen(false)}
          onConfirm={() => {
            setIsWarningModalOpen(false);
          }}
          isdDplication={true}
        />
      )}
    </main>
  );
};

export default SupplementAddPage;

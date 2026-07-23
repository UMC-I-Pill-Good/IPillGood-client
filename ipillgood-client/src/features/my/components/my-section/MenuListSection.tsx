'use client';
import { useState } from 'react';
import SectionItem from '../SectionItem';
import SectionCard from '../SectionCard';
import SurveyEditSheet from './SurveyEditSheet';
import PremiumSheet from './PremiumSheet';
import { MENU_LIST } from '../../constants/menuList';

const MenuListSection = () => {
  const [openSheet, setOpenSheet] = useState<'survey' | 'premium' | null>(null);

  const handleOpenChange = (sheet: 'survey' | 'premium') => {
    return (open: boolean) => {
      setOpenSheet(open ? sheet : null);
    };
  };

  return (
    <section>
      <SectionCard>
        {MENU_LIST.map((menu) => (
          <SectionItem
            key={menu.label}
            {...menu}
            onClick={menu.href ? undefined : () => setOpenSheet(menu.sheet ?? null)}
          />
        ))}
      </SectionCard>
      <SurveyEditSheet open={openSheet === 'survey'} onOpenChange={handleOpenChange('survey')} />
      <PremiumSheet open={openSheet === 'premium'} onOpenChange={handleOpenChange('premium')} />
    </section>
  );
};

export default MenuListSection;

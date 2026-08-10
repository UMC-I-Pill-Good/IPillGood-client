import {
  FlowerIcon,
  FlowerLockedIcon,
  FruitIcon,
  FruitLockedIcon,
  SeedIcon,
  SproutIcon,
  SproutLockedIcon,
  TreeIcon,
  TreeLockedIcon,
} from '@/assets';
import type { GrowthStageOptionType } from '../types/growthStage.type';

export const GROWTH_STAGE_OPTION_LIST: GrowthStageOptionType[] = [
  { label: '씨앗', value: 'SEED', icon: SeedIcon, dayRangeText: '0~6일' },
  {
    label: '새싹',
    value: 'SPROUT',
    icon: SproutIcon,
    lockedIcon: SproutLockedIcon,
    dayRangeText: '7~14일',
  },
  {
    label: '꽃',
    value: 'FLOWER',
    icon: FlowerIcon,
    lockedIcon: FlowerLockedIcon,
    dayRangeText: '15~29일',
  },
  {
    label: '열매',
    value: 'FRUIT',
    icon: FruitIcon,
    lockedIcon: FruitLockedIcon,
    dayRangeText: '30~44일',
  },
  {
    label: '나무',
    value: 'TREE',
    icon: TreeIcon,
    lockedIcon: TreeLockedIcon,
    dayRangeText: '45일 이상',
  },
];

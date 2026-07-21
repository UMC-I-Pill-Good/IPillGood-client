import type { LucideIcon } from 'lucide-react';

export type MenuItemType = {
  label: string;
  icon: LucideIcon;
  href?: string;
  sheet?: 'survey' | 'premium';
};

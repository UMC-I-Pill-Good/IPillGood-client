import { FileText, HelpCircle, MessagesSquare, MonitorSmartphone, Settings } from 'lucide-react';
import type { MenuItemType } from '../types/menu.type';

export const MENU_LIST: MenuItemType[] = [
  { label: '설문 수정', icon: FileText, sheet: 'survey' },
  { label: '설정', icon: Settings, href: '/my/settings' },
  { label: '문의/고객 센터', icon: HelpCircle, href: '/my/inquiry' },
  { label: '서비스 소개 및 오픈소스', icon: MessagesSquare, href: '/my/about' },
  { label: '프리미엄 서비스 (구독)', icon: MonitorSmartphone, sheet: 'premium' },
];

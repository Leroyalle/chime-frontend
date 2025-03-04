import {
  Newspaper,
  Flame,
  UserRoundCheck,
  MessageCircle,
  Heart,
  Bookmark,
  LucideIcon,
} from 'lucide-react';
import { RoutesEnum } from '@/types';

export interface NavItem {
  title: string;
  href: RoutesEnum;
  icon: LucideIcon;
  color?: string;
  appendUserId?: boolean;
}

export interface NavCategory {
  title: string;
  items: NavItem[];
}

export const navCategories: NavCategory[] = [
  {
    title: 'Основное',
    items: [
      {
        title: 'Популярное',
        href: RoutesEnum.HOME,
        icon: Newspaper,
        color: 'text-success-500',
      },
      {
        title: 'Свежее',
        href: RoutesEnum.NEW,
        icon: Flame,
        color: 'text-danger-500',
      },
    ],
  },
  {
    title: 'Общение',
    items: [
      {
        title: 'Друзья',
        href: RoutesEnum.FRIENDS,
        icon: UserRoundCheck,
        color: 'text-blue-500',
        appendUserId: true,
      },
      {
        title: 'Сообщения',
        href: RoutesEnum.MESSAGES,
        icon: MessageCircle,
      },
    ],
  },
  {
    title: 'Любимое',
    items: [
      {
        title: 'Ваши лайки',
        href: RoutesEnum.LIKES,
        icon: Heart,
        color: 'text-red-500',
      },
      {
        title: 'Закладки',
        href: RoutesEnum.BOOKMARKS,
        icon: Bookmark,
        color: 'text-purple-500',
      },
    ],
  },
];

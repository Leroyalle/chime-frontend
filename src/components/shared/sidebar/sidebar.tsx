'use client';
import React from 'react';
import { SidebarItem } from './sidebar-item';
import {
  Bookmark,
  BookUser,
  ContactRound,
  Flame,
  Heart,
  MessageCircle,
  Newspaper,
  User,
  UserRoundCheck,
} from 'lucide-react';
import { RoutesEnum } from '../../../../@types';
import { useGetMe } from '@/lib/hooks';
import { DarkLightBlock } from '@/components/ui';
import { useNewMarkSlice } from '@/store';

interface Props {
  className?: string;
}

export const Sidebar: React.FC<Props> = ({ className }) => {
  const { data } = useGetMe();
  const { newMark, setNewMark } = useNewMarkSlice();

  const handleClickNew = () => {
    setNewMark(false);
  };

  return (
    <DarkLightBlock className={className}>
      <div className="text-xs font-semibold uppercase text-muted-foreground mb-4">Основное</div>
      <nav>
        <ul className="flex flex-col gap-1">
          <li>
            <SidebarItem icon={<User size={20} />} href={`${RoutesEnum.USER}/${data?.user.id}`}>
              Мой профиль
            </SidebarItem>
          </li>
          <li>
            <SidebarItem icon={<Newspaper size={20} />} href={RoutesEnum.HOME}>
              Популярное
            </SidebarItem>
          </li>
          <li onClick={handleClickNew}>
            <SidebarItem icon={<Flame size={20} />} href={RoutesEnum.NEW} mark={newMark}>
              Свежее
            </SidebarItem>
          </li>
        </ul>
      </nav>
      <div className="text-xs font-semibold uppercase text-muted-foreground my-4">Общение</div>
      <nav>
        <ul className="flex flex-col gap-1">
          <li>
            <SidebarItem
              icon={<BookUser size={20} />}
              href={`${RoutesEnum.USER}/${data?.user.id}${RoutesEnum.FOLLOWING}`}>
              Ваши подписки
            </SidebarItem>
          </li>
          <li>
            <SidebarItem
              icon={<ContactRound size={20} />}
              href={`${RoutesEnum.USER}/${data?.user.id}${RoutesEnum.FOLLOWERS}`}>
              Подписчики
            </SidebarItem>
          </li>
          <li>
            <SidebarItem
              icon={<UserRoundCheck size={20} />}
              href={`${RoutesEnum.FRIENDS}/${data?.user.id}`}>
              Друзья
            </SidebarItem>
          </li>
          <li>
            <SidebarItem icon={<MessageCircle size={20} />} href={RoutesEnum.MESSAGES}>
              Сообщения
            </SidebarItem>
          </li>
        </ul>
      </nav>
      <div className="text-xs font-semibold uppercase text-muted-foreground my-4">Любимое</div>
      <nav>
        <ul className="flex flex-col gap-1">
          <li>
            <SidebarItem icon={<Heart size={20} />} href={RoutesEnum.LIKED}>
              Ваши лайки
            </SidebarItem>
          </li>
          <li>
            <SidebarItem icon={<Bookmark size={20} />} href={RoutesEnum.BOOKMARKS}>
              Закладки
            </SidebarItem>
          </li>
        </ul>
      </nav>
    </DarkLightBlock>
  );
};

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
  SidebarClose

} from 'lucide-react';
import { RoutesEnum } from '../../../../@types';
import { useGetMe } from '@/lib/hooks';
import { DarkLightBlock } from '@/components/ui';
import { useNewMarkSlice } from '@/store';

interface Props {
  className?: string;
  handleCloseSidebar?: () => void;
}

export const Sidebar: React.FC<Props> = ({ className, handleCloseSidebar }) => {
  const { data } = useGetMe();
  const { newMark, setNewMark } = useNewMarkSlice();

  const handleClickNew = () => {
    setNewMark(false);
  };


  const ListNavElement: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <nav onClick={handleCloseSidebar}>
        <ul className="flex flex-col gap-1">
          {children}
        </ul>
      </nav>
    )
  };

  return (
    <DarkLightBlock className={className}>

      <SidebarClose className="absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 hover:scale-110" rotate={-180}
        onClick={handleCloseSidebar}
      />



      <div className="text-xs font-semibold uppercase text-muted-foreground mb-4">Основное</div>
      <ListNavElement>
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
      </ListNavElement>

      <div className="text-xs font-semibold uppercase text-muted-foreground my-4">Общение</div>
      <ListNavElement>
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
      </ListNavElement>

      <div className="text-xs font-semibold uppercase text-muted-foreground my-4">Любимое</div>
      <ListNavElement>
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
      </ListNavElement>

    </DarkLightBlock>
  );
};



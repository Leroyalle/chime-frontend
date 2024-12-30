'use client';
import React from 'react';
import { SidebarItem } from './sidebar-item';
import { BookUser, Flame, MessageCircle, Newspaper, User } from 'lucide-react';
import { RoutesEnum } from '../../../../@types';
import { useGetMe } from '@/lib/hooks';

interface Props {
  className?: string;
}

export const Sidebar: React.FC<Props> = ({ className }) => {
  const { data } = useGetMe();

  return (
    <nav className={className}>
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
        <li>
          <SidebarItem icon={<Flame size={20} />} href={RoutesEnum.NEW}>
            Свежее
          </SidebarItem>
        </li>
        <li>
          <SidebarItem icon={<BookUser size={20} />} href={RoutesEnum.FRIENDS}>
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
  );
};

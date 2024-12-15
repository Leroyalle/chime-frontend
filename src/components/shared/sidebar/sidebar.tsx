import React from 'react';
import { SidebarItem } from './sidebar-item';
import { BookUser, Flame, MessageCircle, Newspaper, User } from 'lucide-react';

interface Props {
  className?: string;
}

export const Sidebar: React.FC<Props> = ({ className }) => {
  return (
    <nav className={className}>
      <ul className="flex flex-col gap-1">
        <li>
          <SidebarItem icon={<User size={20} />} href={'/user/1'}>
            Мой профиль
          </SidebarItem>
        </li>
        <li>
          <SidebarItem icon={<Newspaper size={20} />} href={'/'}>
            Популярное
          </SidebarItem>
        </li>
        <li>
          <SidebarItem icon={<Flame size={20} />} href={'/new'}>
            Свежее
          </SidebarItem>
        </li>
        <li>
          <SidebarItem icon={<BookUser size={20} />} href={'/friends'}>
            Друзья
          </SidebarItem>
        </li>
        <li>
          <SidebarItem icon={<MessageCircle size={20} />} href={'/im'}>
            Сообщения
          </SidebarItem>
        </li>
      </ul>
    </nav>
  );
};

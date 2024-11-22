import React from 'react';
import { SidebarItem } from './sidebar-item';
import { BookUser, MessageCircle, Newspaper, User } from 'lucide-react';

interface Props {
  className?: string;
}

export const Sidebar: React.FC<Props> = ({ className }) => {
  return (
    <nav className={className}>
      <ul className="flex flex-col gap-5">
        <li>
          <SidebarItem icon={<User size={20} />} href={'/profile'}>
            Мой профиль
          </SidebarItem>
          <SidebarItem icon={<Newspaper size={20} />} href={'/'}>
            Новости
          </SidebarItem>
          <SidebarItem icon={<BookUser size={20} />} href={'/friends'}>
            Друзья
          </SidebarItem>
          <SidebarItem icon={<MessageCircle size={20} />} href={'/friends'}>
            Сообщения
          </SidebarItem>
        </li>
      </ul>
    </nav>
  );
};

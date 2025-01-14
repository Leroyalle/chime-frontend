'use client';
import React from 'react';
import { SidebarItem } from './sidebar-item';
import { Bookmark, Flame, Heart, MessageCircle, Newspaper, UserRoundCheck } from 'lucide-react';
import { RoutesEnum } from '../../../../@types';
import { useGetMe } from '@/lib/hooks';
import { DarkLightBlock } from '@/components/ui';
import { useNewMarkSlice } from '@/store';
import { ListNavElement } from '../../ui';
import { cn } from '@/lib/utils';
import { SectionTitle } from './section-title';

interface Props {
  className?: string;
}

export const Sidebar: React.FC<Props> = ({ className }) => {
  const { data: me } = useGetMe();
  const { newMark, setNewMark } = useNewMarkSlice();

  return (
    <DarkLightBlock className={cn('bg-background', className)}>
      <aside>
        <SectionTitle title="Основное" className="mt-0" />
        <ListNavElement>
          <li>
            <SidebarItem
              icon={<Newspaper size={20} className="text-green-500" />}
              href={RoutesEnum.HOME}>
              Популярное
            </SidebarItem>
          </li>
          <li onClick={() => setNewMark(false)}>
            <SidebarItem
              icon={<Flame size={20} className="text-yellow-500" />}
              href={RoutesEnum.NEW}
              mark={newMark}>
              Свежее
            </SidebarItem>
          </li>
        </ListNavElement>

        <SectionTitle title="Общение" />
        <ListNavElement>
          <li>
            <SidebarItem
              icon={<UserRoundCheck size={20} className="text-blue-500" />}
              href={`${RoutesEnum.FRIENDS}/${me?.user.id}`}>
              Друзья
            </SidebarItem>
          </li>
          <li>
            <SidebarItem icon={<MessageCircle size={20} />} href={RoutesEnum.MESSAGES}>
              Сообщения
            </SidebarItem>
          </li>
        </ListNavElement>

        <SectionTitle title="Любимое" />
        <ListNavElement>
          <li>
            <SidebarItem
              icon={<Heart size={20} className="text-red-500" />}
              href={RoutesEnum.LIKES}>
              Ваши лайки
            </SidebarItem>
          </li>
          <li>
            <SidebarItem
              icon={<Bookmark size={20} className="text-purple-500" />}
              href={RoutesEnum.BOOKMARKS}>
              Закладки
            </SidebarItem>
          </li>
        </ListNavElement>
      </aside>
    </DarkLightBlock>
  );
};

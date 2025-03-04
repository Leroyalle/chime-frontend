'use client';
import React, { Fragment } from 'react';
import { SidebarItem } from './sidebar-item';
import {} from 'lucide-react';
import { useGetMe } from '@/lib/hooks';
import { DarkLightBlock } from '@/components/ui';
import { useNewMarkSlice } from '@/store';
import { ListNavElement } from '../../ui';
import { cn } from '@/lib/utils';
import { SectionTitle } from './section-title';
import { LogoutButton } from '../logout-button';
import { navCategories } from '@/constants';

interface Props {
  className?: string;
}

export const Sidebar: React.FC<Props> = ({ className }) => {
  const { data: me } = useGetMe();
  const { newMark } = useNewMarkSlice();

  if (!me) {
    return null;
  }

  return (
    <DarkLightBlock className={cn('bg-background overscroll-contain', className)}>
      <aside>
        {navCategories.map(({ title, items }, i) => (
          <Fragment key={i}>
            <SectionTitle title={title} className={cn(i === 0 && 'mt-0')} />
            <ListNavElement>
              {items.map((item, i) => (
                <li key={i}>
                  <SidebarItem
                    mark={newMark}
                    icon={<item.icon size={20} className={item.color} />}
                    href={item.appendUserId ? `${item.href}/${me.user.id}` : item.href}>
                    {item.title}
                  </SidebarItem>
                </li>
              ))}
            </ListNavElement>
          </Fragment>
        ))}
        <LogoutButton className="my-4" />
      </aside>
    </DarkLightBlock>
  );
};

import React from 'react';
import { cn } from '@/lib/utils';
import { ChatItem } from './chat-item';
import { DarkLightBlock } from '../../ui/dark-light-block';
import { ChatWithMembers } from '@/types';
import { useGetMe } from '@/lib/hooks';

interface Props {
  hasActions?: boolean;
  items?: ChatWithMembers[];
  itemsStyles?: string;
  className?: string;
}

export const ChatList: React.FC<Props> = ({ items, itemsStyles, hasActions, className }) => {
  const { data: me } = useGetMe();

  if (!items || items.length === 0 || !me) {
    return null;
  }

  return (
    <DarkLightBlock className={cn('flex flex-col gap-y-2 w-full overflow-y-auto', className)}>
      {items.map((chat) => (
        <ChatItem
          key={chat.id}
          chat={chat}
          hasActions={hasActions}
          className={itemsStyles}
          me={me}
        />
      ))}
    </DarkLightBlock>
  );
};

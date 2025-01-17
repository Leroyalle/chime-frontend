import React from 'react';
import { cn } from '@/lib/utils';
import { ChatItem } from './chat-item';
import { DarkLightBlock } from '../../ui/dark-light-block';
import { UserChat } from '../../../../@types/chat';

interface Props {
  hasActions?: boolean;
  items?: UserChat[];
  itemsStyles?: string;
  className?: string;
}

export const ChatList: React.FC<Props> = ({ items, itemsStyles, hasActions, className }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <DarkLightBlock className={cn('flex flex-col gap-y-2 p-2 w-full overflow-y-auto', className)}>
      {items.map((item) => (
        <ChatItem
          key={item.id}
          chatId={item.id}
          imageUrl={item.imageUrl}
          name={item.name}
          lastMessage={item.lastMessage}
          hasActions={hasActions}
          className={itemsStyles}
        />
      ))}
    </DarkLightBlock>
  );
};

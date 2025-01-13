import React from 'react';
import { cn } from '@/lib/utils';
import { ChatItem } from './chat-item';
import { DarkLightBlock } from '../../../ui/dark-light-block';
import { UserChat } from '../../../../../@types/chat';

interface Props {
  items?: UserChat[];
  itemsStyles?: string;
  className?: string;
}

export const ChatList: React.FC<Props> = ({ items, itemsStyles, className }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <DarkLightBlock
      className={cn('flex flex-col gap-y-2 p-2 h-full w-full overflow-y-auto', className)}>
      {items.map((item) => (
        <ChatItem
          key={item.id}
          chatId={item.id}
          imageUrl={item.imageUrl}
          name={item.name}
          lastMessage={item.lastMessage}
          className={itemsStyles}
        />
      ))}
    </DarkLightBlock>
  );
};

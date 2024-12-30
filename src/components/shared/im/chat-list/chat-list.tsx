import React from 'react';
import { cn } from '@/lib/utils';
import { ChatItem } from './chat-item';
import { DarkLightBlock } from '../../../ui/dark-light-block';
import { UserChat } from '../../../../../@types/chat';

interface Props {
  items: UserChat[];
  className?: string;
}

export const ChatList: React.FC<Props> = ({ items, className }) => {
  return (
    <DarkLightBlock className={cn('flex flex-col gap-y-2 py-2 h-full overflow-y-auto', className)}>
      {items?.map((item, index) => (
        <ChatItem key={index} chatId={item.id} imageUrl={item.imageUrl} name={item.name} />
      ))}
    </DarkLightBlock>
  );
};

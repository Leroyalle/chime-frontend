import React from 'react';
import { cn } from '@/lib/utils';
import { ChatItem } from './chat-item';
import { DarkLightBlock } from '../../../ui/dark-light-block';

interface Props {
  className?: string;
}

export const ChatList: React.FC<Props> = ({ className }) => {
  return (
    <DarkLightBlock className={cn('flex flex-col gap-y-2 h-full overflow-y-auto', className)}>
      {[...Array(30)].map((_, index) => (
        <ChatItem key={index} />
      ))}
    </DarkLightBlock>
  );
};

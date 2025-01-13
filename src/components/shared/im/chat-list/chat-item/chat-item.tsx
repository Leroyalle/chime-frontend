import React from 'react';
import { cn } from '@/lib/utils';
import { ChatPreview as Preview } from './chat-preview';
import Link from 'next/link';
import { ChatActions as Actions } from './chat-actions';
import { RoutesEnum } from '../../../../../../@types';
import { Message } from '../../../../../../@types/newDto';

interface Props {
  chatId: string;
  imageUrl?: string;
  name: string;
  lastMessage: Message;
  className?: string;
}

export const ChatItem: React.FC<Props> = ({ chatId, imageUrl, name, lastMessage, className }) => {
  return (
    <div className="relative">
      <Link href={`${RoutesEnum.MESSAGES}/${chatId}`} className="w-full select-none">
        <div className={cn('p-2 rounded-xl transition-all hover:bg-primary', className)}>
          <Preview imageUrl={imageUrl} name={name} lastMessage={lastMessage} />
        </div>
      </Link>
      <Actions className="absolute top-2 right-2" />
    </div>
  );
};

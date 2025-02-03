import React from 'react';
import { cn } from '@/lib/utils';
import { ChatPreview as Preview } from './chat-preview';
import Link from 'next/link';
import { ChatActions as Actions } from './chat-actions';
import { ChatWithMembers, RoutesEnum, UserResponse } from '@/types';

interface Props {
  chat: ChatWithMembers;
  me: UserResponse;
  hasActions?: boolean;
  className?: string;
}

export const ChatItem: React.FC<Props> = ({ chat, me, hasActions = true, className }) => {
  const correspondent = chat.members.find((member) => member.id !== me.user.id);
  const messageAuthor = chat.lastMessage?.UserBase?.name === me.user.name ? 'Вы:' : null;

  return (
    <div className={cn('relative rounded-xl transition-all hover:bg-primary-light', className)}>
      <Link href={`${RoutesEnum.MESSAGES}/${chat.id}`} className="w-full select-none">
        <div className="p-2">
          <Preview
            avatar={correspondent?.avatar}
            name={correspondent?.name}
            lastMessage={chat.lastMessage}
            lastMessageAuthor={messageAuthor}
          />
        </div>
      </Link>
      {hasActions && <Actions className="absolute top-2 right-2" />}
    </div>
  );
};

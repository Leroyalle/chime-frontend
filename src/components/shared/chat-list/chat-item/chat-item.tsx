import React from 'react';
import { cn } from '@/lib/utils';
import { ChatPreview as Preview } from './chat-preview';
import Link from 'next/link';
import { ChatActions as Actions } from './chat-actions';
import { MessageDto, RoutesEnum } from '@/types';
import { useGetMeData } from '@/lib/hooks';

interface Props {
  chatId: string;
  imageUrl?: string;
  name: string;
  lastMessage: MessageDto;
  hasActions?: boolean;
  isShareMode?: boolean;
  className?: string;
}

export const ChatItem: React.FC<Props> = ({
  chatId,
  imageUrl,
  name,
  lastMessage,
  hasActions = true,
  className,
}) => {
  const me = useGetMeData();
  const messageAuthor = lastMessage?.UserBase?.name === me?.user.name ? 'Вы:' : null;

  return (
    <div className={cn('relative', className)}>
      <Link href={`${RoutesEnum.MESSAGES}/${chatId}`} className="w-full select-none">
        <div className={'p-2 rounded-xl transition-all hover:bg-primary-light'}>
          <Preview
            imageUrl={imageUrl}
            name={name}
            lastMessage={lastMessage}
            lastMessageAuthor={messageAuthor}
          />
        </div>
      </Link>
      {hasActions && <Actions className="absolute top-2 right-2" />}
    </div>
  );
};

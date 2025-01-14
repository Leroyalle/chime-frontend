'use client';
import React from 'react';
import { DarkLightBlock } from '../../ui';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/services/api-client';
import { Skeleton } from '@nextui-org/react';
import { ChatList } from '../im/chat-list';
import { SearchChats } from './search-chats';

interface Props {
  className?: string;
}

export const AsideChatsWrapper: React.FC<Props> = ({ className }) => {
  const { data: chats, isPending: isPendingChats } = useQuery({
    ...Api.chat.getUserChatsQueryOptions(),
  });

  console.log(chats);

  if (isPendingChats) {
    return <Skeleton className={cn('w-full', className)} />;
  }

  return (
    <DarkLightBlock className={cn('bg-background', className)}>
      <section>
        <h2 className="text-xl mb-2">Сообщения</h2>
        <SearchChats className="mb-2 w-full" />
        <div className="w-full h-[2px] bg-primary-light" />
        {chats && chats.length > 0 ? (
          <ChatList items={chats} className="bg-background" itemsStyles="hover:bg-primary-light" />
        ) : (
          <h2>нет чатов</h2>
        )}
      </section>
    </DarkLightBlock>
  );
};

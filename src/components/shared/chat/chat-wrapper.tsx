'use client';
import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { ChatHead as Header } from './chat-head';
import { DarkLightBlock } from '../../ui';
import { useInfinityScrollMessages } from '@/lib/hooks';
import { Spinner } from '@nextui-org/react';
import { ChatWithMembers } from '../../../../@types/chat';
import { ChatMain as Main } from './chat-main';

interface Props {
  chatId: string;
  chat: ChatWithMembers;
  className?: string;
}

export const ChatWrapper: React.FC<Props> = ({ chatId, chat, className }) => {
  const chatRef = useRef<HTMLDivElement>(null);

  const {
    data: messages,
    cursor,
    isPending,
    isFetchingNextPage,
  } = useInfinityScrollMessages({
    chatId,
    chatRef,
  });

  if (isPending) {
    return (
      <Spinner
        color="warning"
        className="absolute bottom-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 "
      />
    );
  }

  return (
    <DarkLightBlock
      className={cn(
        'h-[calc(100vh-58px-32px)] py-2 pt-0 flex flex-col overflow-y-auto w-auto',
        className,
      )}>
      <Header className="px-6" name={chat.name} members={chat.members} avatar={chat.imageUrl} />
      <Main
        chatRef={chatRef}
        chatId={chatId}
        messages={messages}
        cursor={cursor}
        isFetchingNextPage={isFetchingNextPage}
      />
    </DarkLightBlock>
  );
};

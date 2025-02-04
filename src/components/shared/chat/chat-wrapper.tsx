'use client';
import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { ChatHead as Header } from './chat-head';
import { DarkLightBlock } from '../../ui';
import { useGetMe, useInfinityScrollMessages } from '@/lib/hooks';
import { Spinner } from '@nextui-org/react';
import { ChatWithMembers } from '../../../types/chat';
import { ChatMain as Main } from './chat-main';

interface Props {
  chatId: string;
  chat: ChatWithMembers;
  className?: string;
}

export const ChatWrapper: React.FC<Props> = ({ chatId, chat, className }) => {
  const chatRef = useRef<HTMLDivElement>(null);
  const { data: me } = useGetMe();
  const correspondent = chat.members.find((m) => m.id !== me?.user.id);

  const {
    data: messages,
    isPending,
    isFetchingNextPage,
    cursor,
  } = useInfinityScrollMessages({
    chatId,
    chatRef,
  });

  if (isPending) {
    return (
      <Spinner
        color="warning"
        className="absolute bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    );
  }

  return (
    <DarkLightBlock
      className={cn(
        'min-h-[calc(100vh-32px)] max-h-[calc(100vh-32px)] py-2 pt-0 flex flex-col justify-between overflow-y-auto w-auto',
        className,
      )}>
      <Header className="px-6" correspondent={correspondent} />
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

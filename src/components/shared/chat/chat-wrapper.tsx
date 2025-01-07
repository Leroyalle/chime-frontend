'use client';
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ChatHead as Header } from './chat-head';
import { DarkLightBlock } from '../../ui';
import { ChatBody as Body } from './chat-body';
import { ChatInput as Field } from './chat-fields';
import { useInfinityScrollMessages, useSocket } from '@/lib/hooks';
import { Spinner } from '@nextui-org/react';
import { ChatWithMembers } from '../../../../@types/chat';

interface Props {
  chatId: string;
  chat: ChatWithMembers;
  className?: string;
}

export const ChatWrapper: React.FC<Props> = ({ chatId, chat, className }) => {
  const chatRef = useRef<HTMLDivElement>(null);
  const { send } = useSocket();

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
  };

  return (
    <DarkLightBlock
      className={cn(
        ' py-2 pt-0 flex flex-col overflow-y-auto w-auto h-full',
        className,
      )}>
      <Header className="px-6" name={chat.name} members={chat.members} avatar={chat.imageUrl} />
      <Body
        className="flex-1 px-4"
        messages={messages}
        chatRef={chatRef}
        cursor={cursor} 
        loader={
          isFetchingNextPage ? <Spinner color="warning" className="w-full mx-auto" /> : undefined
        }
      />
      <Field className="px-6" chatId={chatId} onSendMessage={send} />
    </DarkLightBlock>
  );
};

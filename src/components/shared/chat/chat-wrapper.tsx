'use client';
import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { ChatHead as Header } from './chat-head';
import { DarkLightBlock } from '../../ui';
import { ChatBody as Body } from './chat-body';
import { ChatInput as Field } from './chat-fields';
import { useInfinityScrollMessages, useReactQuerySubscription } from '@/lib/hooks';
import { Spinner } from '@nextui-org/react';

interface Props {
  chatId: string;
  className?: string;
}

export const ChatWrapper: React.FC<Props> = ({ chatId, className }) => {
  const chatRef = useRef<HTMLDivElement>(null);
  const { send } = useReactQuerySubscription();

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
        'py-2 pt-0 flex flex-col overflow-y-auto h-[calc(100vh-58px-32px)]',
        className,
      )}>
      <Header
        className="px-6"
        name="Николай Мелонов"
        avatar="https://avatars.githubusercontent.com/u/158848927?v=4"
      />
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

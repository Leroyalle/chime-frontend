import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Message } from './message';
import { Message as TMessage } from '../../../../../@types/newDto';
import { EmptyState } from '../../empty-state';
import { useGetMe } from '@/lib/hooks';

interface Props {
  chatRef: React.RefObject<HTMLDivElement>;
  messages?: TMessage[];
  cursor?: JSX.Element;
  loader?: JSX.Element;
  className?: string;
}

export const ChatBody: React.FC<Props> = ({ chatRef, messages, cursor, loader, className }) => {
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const { data: userData } = useGetMe()

  if (!messages || messages.length === 0) {
    return <EmptyState title="Нет сообщений" text="Напишите первое сообщение!" />;
  }


  return (
    <div ref={chatRef} className={cn('w-full flex flex-col gap-y-4 overflow-y-auto', className)}>
      {loader}
      {messages && cursor}
      {messages.map((message, i) => (

        <Message
          key={i}
          messageId={message.id}
          userId={message.UserBase.id}
          author={message.UserBase.name}
          content={message.body}
          avatar="https://avatars.githubusercontent.com/u/158848927?v=4"
          isSender={message.UserBase.id == userData?.user.id}
          createdAt={message.createdAt}
        />
      ))}
    </div>
  );
};

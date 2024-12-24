import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Message } from './message';
import { Message as TMessage } from '../../../../../@types/newDto';
import { EmptyState } from '../../empty-state';

interface Props {
  messages?: TMessage[];
  className?: string;
}

export const ChatBody: React.FC<Props> = ({ messages, className }) => {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, []);

  if (!messages || messages.length === 0) {
    return <EmptyState title="Нет сообщений" text="Напишите первое сообщение!" />;
  }

  return (
    <div ref={chatRef} className={cn('w-full flex flex-col gap-y-4 overflow-y-auto', className)}>
      {messages.map((message, i) => (
        <Message
          key={i}
          userId="1"
          author="Николай Мелонов"
          content="Привет"
          avatar="https://avatars.githubusercontent.com/u/158848927?v=4"
          isSender={true}
          createdAt={new Date()}
        />
      ))}
    </div>
  );
};

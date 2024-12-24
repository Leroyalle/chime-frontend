import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Message } from './message';

interface Props {
  className?: string;
}

export const ChatBody: React.FC<Props> = ({ className }) => {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, []);

  return (
    <div ref={chatRef} className={cn('w-full flex flex-col gap-y-4 overflow-y-auto', className)}>
      {[...Array(30)].map((_, index) => (
        <Message
          key={index}
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

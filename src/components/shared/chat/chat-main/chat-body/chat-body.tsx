import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Message } from './message';
import { MessageDto } from '../../../../../../@types/dto';
import { useGetMe } from '@/lib/hooks';
import { EmptyState } from '../../../empty-state';

interface Props {
  chatRef: React.RefObject<HTMLDivElement>;
  messages?: MessageDto[];
  cursor?: JSX.Element;
  loader?: JSX.Element;
  onEditMessage: (message: MessageDto) => void;
  className?: string;
}

export const ChatBody: React.FC<Props> = ({
  chatRef,
  messages,
  cursor,
  loader,
  onEditMessage,
  className,
}) => {
  const { data: userData } = useGetMe();
  
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
      {loader}
      {messages && cursor}
      {messages.map((message) => (
        <Message
          key={message.id}
          userId={message.UserBase.id}
          messageId={message.id}
          postId={message.postId ?? null}
          postAuthor={message.post?.author ?? null}
          author={message.UserBase.name}
          content={message.content}
          contentPost={message.post?.content ?? null}
          postCreatedAt={message.post?.createdAt || null}
          imagePreview={message.post?.images ? message.post.images[0]?.url : null}
          avatar="https://avatars.githubusercontent.com/u/158848927?v=4"
          isSender={message.UserBase.id == userData?.user.id}
          messageType={message.type}
          createdAt={message.createdAt}
          onUpdate={() => onEditMessage(message)}
        />
      ))}
    </div>
  );
};

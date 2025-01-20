import React, { useState } from 'react';
import { ChatBody } from './chat-body';
import { ChatInput } from './chat-fields';
import { Message } from '../../../../../@types/dto';
import { Spinner } from '@nextui-org/react';

interface Props {
  chatId: string;
  messages?: Message[];
  chatRef: React.RefObject<HTMLDivElement>;
  cursor?: JSX.Element;
  isFetchingNextPage: boolean;
}

export const ChatMain: React.FC<Props> = ({
  chatId,
  chatRef,
  messages,
  cursor,
  isFetchingNextPage,
}) => {
  const [editableMessage, setEditableMessage] = useState<Message | null>(null);
  return (
    <>
      <ChatBody
        className="flex-1 px-4"
        messages={messages}
        chatRef={chatRef}
        cursor={cursor}
        onEditMessage={setEditableMessage}
        loader={
          isFetchingNextPage ? <Spinner color="warning" className="w-full mx-auto" /> : undefined
        }
      />
      <ChatInput
        className="px-6"
        chatId={chatId}
        editableMessage={editableMessage}
        cancelEdit={() => setEditableMessage(null)}
      />
    </>
  );
};

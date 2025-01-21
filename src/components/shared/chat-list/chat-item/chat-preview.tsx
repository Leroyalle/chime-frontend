import React from 'react';
import { cn } from '@/lib/utils';
import { MessageDto } from '../../../../../@types/dto';
import { getRelativeTime } from '@/lib';
import { messageTypeData } from './constants';

interface Props {
  imageUrl?: string;
  name: string;
  // FIXME:  убрать optional
  lastMessage?: MessageDto;
  lastMessageAuthor: string | null;
  className?: string;
}

export const ChatPreview: React.FC<Props> = ({
  imageUrl,
  name,
  lastMessage,
  lastMessageAuthor,
  className,
}) => {
  const messageType = lastMessage && messageTypeData[lastMessage.type];
  const messageContent =
    lastMessage?.content && lastMessage?.content?.length > 4
      ? `${lastMessage?.content?.slice(0, 4)}...`
      : lastMessage?.content;

  return (
    <div className={cn('flex items-center w-full gap-x-2', className)}>
      <div className="w-[52px] h-[52px] rounded-full overflow-hidden flex-shrink-0">
        <img className="object-cover w-full h-full" src={imageUrl} alt={name + 'avatar'} />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between gap-x-2">
          <span>{name}</span>
        </div>
        <div className="flex items-center justify-between gap-x-2">
          <div className="self-end text-gray-400 text-[14px] flex gap-x-1">
            {lastMessageAuthor && <span>{lastMessageAuthor}</span>}
            <p>{messageContent}</p>
            <span className="text-blue-500">{messageType}</span>
          </div>
          <span className="text-gray-600 text-[14px] self-end">
            {getRelativeTime(lastMessage?.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

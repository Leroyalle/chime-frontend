import React from 'react';
import { cn, getAbsoluteUrl } from '@/lib/utils';
import { MessageDto } from '@/types';
import { getRelativeTime } from '@/lib/utils';
import { messageTypeData } from './constants';
import { Avatar } from '@/components/ui';

interface Props {
  avatar?: string | null;
  name?: string;
  lastMessage: MessageDto | null;
  lastMessageAuthor: string | null;
  className?: string;
}

export const ChatPreview: React.FC<Props> = ({
  avatar,
  name,
  lastMessage,
  lastMessageAuthor,
  className,
}) => {
  const messageType = lastMessage && messageTypeData[lastMessage.type];
  const messageContent =
    lastMessage?.content && lastMessage?.content?.length > 10
      ? `${lastMessage?.content?.slice(0, 10)}...`
      : lastMessage?.content;

  return (
    <div className={cn('flex items-center w-full gap-x-2', className)}>
      <div className="w-[52px] h-[52px] rounded-full overflow-hidden flex-shrink-0">
        <Avatar
          className="object-cover w-full h-full"
          src={avatar ? getAbsoluteUrl(avatar) : undefined}
          alt=""
        />
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

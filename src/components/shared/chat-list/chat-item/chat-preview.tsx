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

  return (
    <div className={cn('flex items-center w-full gap-x-2', className)}>
      <div className="w-[52px] h-[52px] rounded-full overflow-hidden flex-shrink-0">
        <Avatar className="object-cover w-full h-full" src={getAbsoluteUrl(avatar)} alt="" />
      </div>
      <div className="flex flex-col w-full min-w-0">
        <div className="flex items-center justify-between gap-x-2">
          <span className="font-medium truncate">{name}</span>
        </div>
        <div className="flex items-center justify-between gap-x-2 w-full">
          <div className="flex items-center gap-x-1 text-gray-400 text-[14px] min-w-0 flex-1">
            {lastMessageAuthor && <span className="flex-shrink-0">{lastMessageAuthor}</span>}
            <p className="truncate overflow-hidden">{lastMessage?.content}</p>
            {messageType && <span className="text-blue-500 flex-shrink-0">{messageType}</span>}
          </div>
          <span className="text-gray-600 text-[14px] flex-shrink-0 ml-2">
            {getRelativeTime(lastMessage?.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

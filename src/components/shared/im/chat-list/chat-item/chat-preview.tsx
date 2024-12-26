import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  imageUrl?: string;
  name: string;
  lastMessage?: string;
  className?: string;
}

export const ChatPreview: React.FC<Props> = ({ imageUrl, name, lastMessage, className }) => {
  return (
    <div className={cn('flex items-center w-full gap-x-2', className)}>
      <div className="w-[52px] h-[52px] rounded-full overflow-hidden flex-shrink-0">
        <img className="object-cover w-full h-full" src={imageUrl} alt="chat avatar" />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between gap-x-2">
          <span>{name}</span>
        </div>
        <div className="flex items-center justify-between gap-x-2">
          <span>{lastMessage}</span>
          <span className="text-gray-600 text-[14px] self-end">10:00</span>
        </div>
      </div>
    </div>
  );
};

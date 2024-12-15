import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const ChatPreview: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex items-center w-full gap-x-2', className)}>
      <div className="w-[52px] h-[52px] rounded-full overflow-hidden flex-shrink-0">
        <img
          className="object-cover w-full h-full"
          src="https://avatars.githubusercontent.com/u/158848927?v=4"
          alt="chat avatar"
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between gap-x-2">
          <span>Николай Мелонов</span>
        </div>
        <div className="flex items-center justify-between gap-x-2">
          <span>Вы: привет</span>
          <span className="text-gray-600 text-[14px] self-end">10:00</span>
        </div>
      </div>
    </div>
  );
};

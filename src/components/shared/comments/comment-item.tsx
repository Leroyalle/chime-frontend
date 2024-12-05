import React from 'react';
import { cn } from '@/lib/utils';
import { Link, User } from '@nextui-org/react';
import { formatToClientDate } from '@/lib';

interface Props {
  author: string;
  avatar?: string;
  content: string;
  createdAt: Date;
  className?: string;
}

export const CommentItem: React.FC<Props> = ({ author, avatar, content, createdAt, className }) => {
  return (
    <div className={cn('flex flex-col gap-y-1 items-start bg-[#f6f6f6] p-4 rounded-xl', className)}>
      <User
        name={author}
        avatarProps={{
          src: avatar,
        }}
      />
      <p>{content}</p>
      <div className="flex w-full justify-between items-center">
        <Link className="text-blue-700 text-xs cursor-pointer">Ответить</Link>
        <span className="text-xs">{formatToClientDate(createdAt)}</span>
      </div>
    </div>
  );
};

import React from 'react';
import { cn } from '@/lib/utils';
import { Link as NextLink, User } from '@nextui-org/react';
import { formatToClientDate } from '@/lib';
import { CommentActions } from './comment-actions';
import Link from 'next/link';
import { RoutesEnum } from '../../../../../@types';

interface Props {
  id: string;
  postId: string;
  authorId: string;
  author: string;
  avatar?: string;
  content: string;
  createdAt: Date;
  isOwner: boolean;
  className?: string;
}

export const CommentItem: React.FC<Props> = ({
  id,
  postId,
  authorId,
  author,
  avatar,
  content,
  createdAt,
  isOwner,
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-y-2 bg-[#f6f6f6] p-4 rounded-xl', className)}>
      <div className="flex justify-between items-center">
        <Link href={`${RoutesEnum.USER}/${authorId}`}>
          <User
            name={author}
            avatarProps={{
              src: avatar,
            }}
          />
        </Link>
        <CommentActions postId={postId} commentId={id} isOwner={isOwner} />
      </div>
      <p>{content}</p>
      <div className="flex w-full justify-between items-center">
        <NextLink className="text-blue-700 text-xs cursor-pointer">Ответить</NextLink>
        <span className="text-xs">{formatToClientDate(createdAt)}</span>
      </div>
    </div>
  );
};

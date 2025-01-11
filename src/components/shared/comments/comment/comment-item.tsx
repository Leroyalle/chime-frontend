import React from 'react';
import { cn } from '@/lib/utils';
import { Link as NextUiLink, User } from '@nextui-org/react';
import { CommentActions } from './comment-actions';
import Link from 'next/link';
import { RoutesEnum } from '../../../../../@types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { OpacityAnimateBlock } from '@/components/ui';
import { PageType } from '../comments-list';

interface Props {
  id: string;
  postId: string;
  authorId: string;
  author: string;
  avatar?: string;
  content: string;
  createdAt: Date;
  isOwner: boolean;
  pageType: PageType;
  onUpdate?: VoidFunction;
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
  onUpdate,
  pageType,
  className,
}) => {
  return (
    <OpacityAnimateBlock
      className={cn('flex flex-col gap-y-2 bg-[#f6f6f6] p-4 rounded-xl', className)}>
      <div className="flex justify-between items-center">
        <Link href={`${RoutesEnum.USER}/${authorId}`}>
          <User
            name={author}
            avatarProps={{
              src: avatar,
            }}
          />
        </Link>
        <CommentActions
          pageType={pageType}
          postId={postId}
          commentId={id}
          userId={authorId}
          isOwner={isOwner}
          onUpdate={onUpdate}
        />
      </div>
      <p>{content}</p>
      <div className="flex w-full justify-between items-center">
        <NextUiLink className="text-blue-700 text-xs cursor-pointer">Ответить</NextUiLink>
        <span className="text-xs">{(dayjs.extend(relativeTime), dayjs(createdAt).fromNow())}</span>
      </div>
    </OpacityAnimateBlock>
  );
};

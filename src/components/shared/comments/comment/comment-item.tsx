import React from 'react';
import { User } from '@nextui-org/react';
import { CommentActions } from './comment-actions';
import Link from 'next/link';
import { RoutesEnum, User as TUser } from '../../../../types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { DarkLightBlock, OpacityAnimateBlock } from '@/components/ui';
import { PageType } from '../comments-list';
import { getAbsoluteUrl } from '@/lib/utils';

interface Props {
  id: string;
  postId: string;
  author: TUser;
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
  author,
  content,
  createdAt,
  isOwner,
  onUpdate,
  pageType,
  className,
}) => {
  return (
    <OpacityAnimateBlock className={className}>
      <DarkLightBlock className="flex bg-primary-light flex-col gap-y-2 p-4 rounded-xl">
        <div className="flex justify-between items-center">
          <Link href={`${RoutesEnum.USER}/${author.id}`}>
            <User
              name={author.name}
              avatarProps={{
                src: getAbsoluteUrl(author?.avatar),
              }}
            />
          </Link>
          <CommentActions
            pageType={pageType}
            postId={postId}
            commentId={id}
            userId={author.id}
            isOwner={isOwner}
            onUpdate={onUpdate}
          />
        </div>
        <div className="flex w-full justify-between items-center gap-x-3">
          <p>{content}</p>
          <span className="text-xs text-foreground/20">
            {(dayjs.extend(relativeTime), dayjs(createdAt).fromNow())}
          </span>
        </div>
      </DarkLightBlock>
    </OpacityAnimateBlock>
  );
};

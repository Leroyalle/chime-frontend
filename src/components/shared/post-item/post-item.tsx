'use client';
import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import { DarkLightBlock } from '../../ui';
import { User } from '@nextui-org/react';
import { PostHeadActions } from './post-top-actions';
import { PostBottomActions } from './post-bottom-actions';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

interface Props {
  userId: string;
  postId: string;
  fullName: string;
  createdAt: Date;
  content: string;
  imageUrl?: string;
  likeCount: number;
  commentCount: number;
  sharedCount: number;
  isLiked: boolean;
  isOwner: boolean;
  className?: string;
}

export const PostItem: React.FC<Props> = memo(function PostItem({
  userId,
  postId,
  fullName,
  createdAt,
  content,
  imageUrl,
  likeCount,
  commentCount,
  sharedCount,
  isLiked,
  isOwner,
  className,
}) {
  return (
    <DarkLightBlock className={cn('p-4', className)}>
      <div>
        <header className="flex justify-between items-center mb-2">
          <Link href={`/user/${userId}`} className="text-lg font-bold hover:underline">
            <User
              name={fullName}
              description={(dayjs.extend(relativeTime), dayjs(createdAt).fromNow())}
              avatarProps={{
                src: 'https://avatars.githubusercontent.com/u/158848927?v=4',
              }}
            />
          </Link>
          <PostHeadActions postId={postId} isOwner={isOwner} />
        </header>
        <div className="flex flex-col gap-y-2 mb-2">
          <div>
            <p>{content}</p>
          </div>
          {imageUrl && (
            <img className="w-full object-cover rounded-md" src={imageUrl} alt={'Post image'} />
          )}
        </div>
        <PostBottomActions
          userId={userId}
          postId={postId}
          likes={likeCount}
          comments={commentCount}
          shared={sharedCount}
          isLiked={isLiked}
        />
      </div>
    </DarkLightBlock>
  );
});

'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { DarkLightBlock } from '../../ui';
import { User } from '@nextui-org/react';
import { PostHeadActions } from './post-top-actions';
import { PostBottomActions } from './post-bottom-actions';
import { formatToClientDate } from '@/lib';
import Link from 'next/link';

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
  className?: string;
}

export const PostItem: React.FC<Props> = ({
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
  className,
}) => {
  return (
    // max-w-[640px]
    <DarkLightBlock className={cn('p-4', className)}>
      <div>
        <header className="flex justify-between items-center mb-2">
          <Link href={`/user/${userId}`} className="text-lg font-bold hover:underline">
            <User
              name={fullName}
              description={formatToClientDate(createdAt)}
              avatarProps={{
                src: 'https://avatars.githubusercontent.com/u/158848927?v=4',
              }}
            />
          </Link>
          <PostHeadActions />
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
};

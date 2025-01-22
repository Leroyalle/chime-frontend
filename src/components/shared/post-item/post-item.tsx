'use client';
import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import { DarkLightBlock } from '../../ui';
import { User } from '@nextui-org/react';
import Link from 'next/link';
import { Image, Tag } from '@/types';
import { TopActions, BottomActions, PostBody } from './components';
import { getRelativeTime } from '@/lib/utils';

interface Props {
  userId: string;
  postId: string;
  fullName: string;
  createdAt: Date;
  content: string;
  images: Image[] | null;
  likeCount: number;
  commentCount: number;
  sharedCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  isOwner: boolean;
  tags: Tag[];
  className?: string;
}

export const PostItem: React.FC<Props> = memo(function PostItem({
  userId,
  postId,
  fullName,
  createdAt,
  content,
  images,
  likeCount,
  commentCount,
  sharedCount,
  isLiked,
  isBookmarked,
  isOwner,
  tags,
  className,
}) {
  return (
    <DarkLightBlock className={cn('p-4', className)}>
      <div>
        <header className="flex justify-between items-center mb-2">
          <Link href={`/user/${userId}`} className="text-lg font-bold hover:underline">
            <User
              name={fullName}
              description={getRelativeTime(createdAt)}
              avatarProps={{
                src: 'https://avatars.githubusercontent.com/u/158848927?v=4',
              }}
            />
          </Link>
          <TopActions postId={postId} userId={userId} isOwner={isOwner} />
        </header>
        <PostBody content={content} images={images} tags={tags} className="mb-3" />
        <div className="my-2 w-full h-[0.1px] bg-gray-700" />
        <BottomActions
          userId={userId}
          postId={postId}
          content={content}
          images={images}
          likes={likeCount}
          comments={commentCount}
          shared={sharedCount}
          isLiked={isLiked}
          isBookmarked={isBookmarked}
        />
      </div>
    </DarkLightBlock>
  );
});

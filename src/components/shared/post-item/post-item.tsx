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
import { Tag } from '../../../../@types/newDto';

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
  tags?: Tag[];
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
              description={(dayjs.extend(relativeTime), dayjs(createdAt).fromNow())}
              avatarProps={{
                src: 'https://avatars.githubusercontent.com/u/158848927?v=4',
              }}
            />
          </Link>
          <PostHeadActions postId={postId} userId={userId} isOwner={isOwner} />
        </header>
        <div className="flex flex-col gap-y-1 mb-3">
          <div>
            <p>{content}</p>
          </div>
          {imageUrl && (
            <img className="w-full object-cover rounded-md" src={imageUrl} alt={'Post image'} />
          )}
          {tags && tags.length > 0 && (
            <ul className="flex flex-wrap gap-x-2">
              {tags.map((tag) => (
                <li key={tag.id} className="text-sm text-blue-500">
                  {`#${tag.value}`}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="my-2 w-full h-[0.1px] bg-gray-700" />
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

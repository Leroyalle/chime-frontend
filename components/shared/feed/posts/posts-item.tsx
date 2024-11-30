import React from 'react';
import { cn } from '@/lib/utils';
import { DarkLightBlock } from '../../dark-light-block';
import { User } from '@nextui-org/react';
import { PostHeadActions } from './post-top-actions';
import { PostBottomActions } from './post-bottom-actions';
import { formatToClientDate } from '@/lib';

interface Props {
  fullName: string;
  createdAt: Date;
  content: string;
  imageUrl?: string;
  likeCount: number;
  commentCount: number;
  sharedCount: number;
  className?: string;
}

export const PostsItem: React.FC<Props> = ({
  fullName,
  createdAt,
  content,
  imageUrl,
  likeCount,
  commentCount,
  sharedCount,
  className,
}) => {
  return (
    <DarkLightBlock className={cn('p-4 max-w-[640px] mb-10', className)}>
      <div>
        <header className="flex justify-between items-center mb-2">
          <User
            name={fullName}
            description={formatToClientDate(createdAt)}
            avatarProps={{
              src: 'https://avatars.githubusercontent.com/u/158848927?v=4',
            }}
          />
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
          postId={1}
          likes={likeCount}
          comments={commentCount}
          shared={sharedCount}
        />
      </div>
    </DarkLightBlock>
  );
};

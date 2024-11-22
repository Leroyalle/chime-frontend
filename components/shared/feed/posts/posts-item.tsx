import React from 'react';
import { cn } from '@/lib/utils';
import { DarkLightBlock } from '../../dark-light-block';
import { User } from '@nextui-org/react';
import { PostHeadActions } from './post-top-actions';
import { PostBottomActions } from './post-bottom-actions';

interface Props {
  className?: string;
}

export const PostsItem: React.FC<Props> = ({ className }) => {
  return (
    <DarkLightBlock className={cn('p-4 max-w-[600px] mb-10', className)}>
      <div>
        <header className="flex justify-between items-center mb-2">
          <User
            name="Leroyalle"
            description="Frontend Developer"
            avatarProps={{
              src: 'https://avatars.githubusercontent.com/u/158848927?v=4',
            }}
          />
          <PostHeadActions />
        </header>
        <div className="flex flex-col gap-y-2 mb-2">
          <div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, iste!</p>
          </div>
          <img
            className="w-full object-cover rounded-md"
            src={'https://avatars.githubusercontent.com/u/158848927?v=4'}
            alt={'post'}
          />
        </div>
        <PostBottomActions postId={1} likes={48} comments={0} shared={0} />
      </div>
    </DarkLightBlock>
  );
};

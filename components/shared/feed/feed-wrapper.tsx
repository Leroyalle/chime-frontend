import React from 'react';
import { cn } from '@/lib/utils';
import { PostsList } from './posts';
import { WritePost } from '../write-post';

interface Props {
  className?: string;
}

export const FeedWrapper: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('max-w-[600px]', className)}>
      <WritePost className="mb-10" />
      <PostsList />
    </div>
  );
};

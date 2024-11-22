import React from 'react';
import { cn } from '@/lib/utils';
import { PostsItem } from './posts-item';

interface Props {
  className?: string;
}

export const PostsList: React.FC<Props> = ({ className }) => {
  return (
    <section className={cn('', className)}>
      {Array.from({ length: 10 }).map((_, index) => (
        <PostsItem key={index} />
      ))}
    </section>
  );
};

'use client';
import React, { useEffect } from 'react';
import { PostsList } from './posts';
import { WritePost } from '../write-post';
import { useInfinityScrollPosts } from '@/lib/hooks';

interface Props {
  className?: string;
}

export const FeedWrapper: React.FC<Props> = ({ className }) => {
  const { data: posts, ref } = useInfinityScrollPosts();
  useEffect(() => {
    console.log('posts', posts);
  }, [posts]);
  return (
    <div className={className}>
      <WritePost className="mb-10" />
      <PostsList items={posts} />
      {posts && <div ref={ref} />}
    </div>
  );
};

'use client';
import React from 'react';
import { WritePost } from '../write-post';
import { useInfinityScrollPosts } from '@/lib/hooks';
import { PostsDto } from '../../../../@types/response';
import { PostsList } from '../posts-list';

interface Props {
  initialPosts: PostsDto;
  className?: string;
}

export const FeedWrapper: React.FC<Props> = ({ initialPosts, className }) => {
  const { data: posts, cursor } = useInfinityScrollPosts({ initialPosts });
  return (
    <div className={className}>
      <WritePost className="mb-10" />
      {posts && <PostsList items={posts} />}
      {cursor}
    </div>
  );
};

'use client';
import React from 'react';
import { WritePost } from '../write-post';
import { useInfinityScrollPosts } from '@/lib/hooks';
import { PostsDto } from '../../../../@types/response';
import { PostsList } from '../posts-list';
import { Spinner } from '@nextui-org/react';

interface Props {
  initialPosts: PostsDto;
  className?: string;
}

export const FeedWrapper: React.FC<Props> = ({ initialPosts, className }) => {
  const { data: posts, cursor, isFetchingNextPage } = useInfinityScrollPosts({ initialPosts });
  return (
    <div className={className}>
      <WritePost className="mb-10" />
      {posts && <PostsList items={posts} />}
      {cursor}
      {isFetchingNextPage && <Spinner color="warning" className="w-full mx-auto mb-2" />}
    </div>
  );
};

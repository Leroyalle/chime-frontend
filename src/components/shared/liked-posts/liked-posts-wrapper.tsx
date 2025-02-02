'use client';
import React from 'react';
import { useInfinityScrollUserLikedPosts } from '@/lib/hooks';
import { PostsList } from '../posts-list';
import { Spinner } from '@nextui-org/react';
import { EmptyState } from '../empty-state';
import { InfinityResponse } from '../../../types/response';
import { Post } from '../../../types/dto';

interface Props {
  initialData: InfinityResponse<Post[]>;
}

export const LikedPostsWrapper: React.FC<Props> = ({ initialData }) => {
  const {
    data: likedPosts,
    isFetching,
    cursor,
    isFetchingNextPage,
  } = useInfinityScrollUserLikedPosts(initialData);

  if (!likedPosts || likedPosts.length === 0) {
    return <EmptyState title="К сожалению, тут пусто" />;
  }

  if (isFetching) {
    return <Spinner color="warning" className="w-full mx-auto mb-2" />;
  }

  return (
    <>
      <PostsList items={likedPosts} />
      {cursor}
      {isFetchingNextPage && <Spinner color="warning" className="w-full mx-auto mb-2" />}
    </>
  );
};

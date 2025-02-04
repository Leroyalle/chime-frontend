'use client';
import React from 'react';
import { InfinityResponse } from '../../../../types/response';
import { Post } from '../../../../types/dto';
import { useGetMe, useInfinityScrollPopularPosts } from '@/lib/hooks';
import { WritePost } from '../../write-post';
import { PostsList } from '../../posts-list';
import { Spinner } from '@nextui-org/react';
import { EmptyState } from '../../empty-state';

interface Props {
  initialPosts: InfinityResponse<Post[]>;
  className?: string;
}

export const PopularFeedWrapper: React.FC<Props> = ({ initialPosts, className }) => {
  const {
    data: posts,
    cursor,
    isFetchingNextPage,
  } = useInfinityScrollPopularPosts({ initialPosts });
  const { data: me } = useGetMe();
  return (
    <div className={className}>
      <WritePost className="mb-10" avatar={me?.user.avatar || null} />
      {posts ? (
        <>
          <PostsList items={posts} />
          {cursor}
          {isFetchingNextPage && <Spinner color="warning" className="w-full mx-auto mb-2" />}
        </>
      ) : (
        <EmptyState title="Нет постов!" text="Станьте легендой, напишите что-то!" />
      )}
    </div>
  );
};

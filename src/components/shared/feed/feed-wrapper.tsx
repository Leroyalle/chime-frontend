'use client';
import React from 'react';
import { WritePost } from '../write-post/write-post';
import { useInfinityScrollPosts } from '@/lib/hooks';
import { PostsList } from '../posts-list';
import { Spinner } from '@nextui-org/react';
import { EmptyState } from '../empty-state';
import { InfinityResponse } from '../../../../@types/newResponse';
import { Post } from '../../../../@types/newDto';

interface Props {
  initialPosts: InfinityResponse<Post[]>;
  className?: string;
}

export const FeedWrapper: React.FC<Props> = ({ initialPosts, className }) => {
  const { data: posts, cursor, isFetchingNextPage } = useInfinityScrollPosts({ initialPosts });

  return (
    <div className={className}>
      <WritePost className="mb-10" avatarUrl={''} />
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

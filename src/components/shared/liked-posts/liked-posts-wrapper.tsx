'use client';
import React from 'react';
import { useInfinityScrollUserLikedPosts } from '@/lib/hooks';
import { PostsList } from '../posts-list';
import { Spinner } from '@nextui-org/react';
import { EmptyState } from '../empty-state';
import { InfinityResponse } from '../../../../@types/newResponse';
import { Post } from '../../../../@types/newDto';

interface Props {
  initialData: InfinityResponse<Post[]>;
}

export const LikedPostsWrapper: React.FC<Props> = ({ initialData }) => {
  const {
    data: likedPosts,
    cursor,
    isFetchingNextPage,
  } = useInfinityScrollUserLikedPosts(initialData);
  return (
    <>
      {likedPosts ? (
        <>
          <PostsList items={likedPosts} />
          {/* FIXME: при наличии курсора багается инвалидация лайкнутых постов, кэш старый при валидном ответе сервера */}
          {likedPosts && likedPosts.length > 0 && cursor}
          {isFetchingNextPage && <Spinner color="warning" className="w-full mx-auto mb-2" />}
        </>
      ) : (
        <EmptyState title="К сожалению, тут пусто" />
      )}
    </>
  );
};

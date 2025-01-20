'use client';
import React from 'react';
import { useInfinityScrollUserBookmarks } from '@/lib/hooks';
import { PostsList } from '../posts-list';
import { Spinner } from '@nextui-org/react';
import { EmptyState } from '../empty-state';
import { InfinityResponse } from '../../../../@types/response';
import { Post } from '../../../../@types/dto';

interface Props {
  initialData: InfinityResponse<Post[]>;
}

export const BookmarksWrapper: React.FC<Props> = ({ initialData }) => {
  const {
    data: likedPosts,
    // cursor,
    isFetchingNextPage,
  } = useInfinityScrollUserBookmarks(initialData);
  return (
    <>
      {likedPosts ? (
        <>
          <PostsList items={likedPosts} />
          {/* FIXME: при наличии курсора багается инвалидация лайкнутых постов, кэш старый при валидном ответе сервера */}
          {/* {likedPosts && cursor} */}
          {isFetchingNextPage && <Spinner color="warning" className="w-full mx-auto mb-2" />}
        </>
      ) : (
        <EmptyState title="Вы пока не добавили закладок" />
      )}
    </>
  );
};

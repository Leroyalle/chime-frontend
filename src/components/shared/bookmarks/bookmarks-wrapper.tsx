'use client';
import React from 'react';
import { useInfinityScrollUserBookmarks } from '@/lib/hooks';
import { PostsList } from '../posts-list';
import { Spinner } from '@nextui-org/react';
import { EmptyState } from '../empty-state';
import { InfinityResponse } from '../../../types/response';
import { Post } from '../../../types/dto';

interface Props {
  initialData: InfinityResponse<Post[]>;
}

export const BookmarksWrapper: React.FC<Props> = ({ initialData }) => {
  const {
    data: bookmarks,
    isFetching,

    cursor,
    isFetchingNextPage,
  } = useInfinityScrollUserBookmarks(initialData);

  if (isFetching) {
    return <Spinner color="warning" className="w-full mx-auto mb-2" />;
  }

  if (!bookmarks || bookmarks.length === 0) {
    return <EmptyState title="Вы пока не добавили закладок" />;
  }

  return (
    <>
      <PostsList items={bookmarks} />
      {cursor}
      {isFetchingNextPage && <Spinner color="warning" className="w-full mx-auto mb-2" />}
    </>
  );
};

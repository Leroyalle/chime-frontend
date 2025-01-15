import { Api } from '@/services/api-client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { InfinityResponse } from '../../../../../@types/newResponse';
import { Post } from '../../../../../@types/newDto';

export const useInfinityScrollUserBookmarks = (initialData: InfinityResponse<Post[]>) => {
  const { ref, inView } = useInView();

  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    ...Api.bookmark.getUserBookmarksInfinityQueryOptions(),
    initialData: { pages: [initialData], pageParams: [1] },
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const cursor = <div ref={ref} className="h-1 w-full bg-transparent" />;

  return { data, isLoading, isError, cursor, isFetchingNextPage };
};

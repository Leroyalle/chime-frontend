import { Api } from '@/services/api-client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Post } from '../../../../types/dto';
import { InfinityResponse } from '../../../../types/response';

export const useInfinityScrollUserLikedPosts = (initialData: InfinityResponse<Post[]>) => {
  const { ref, inView } = useInView();

  const { data, isPending, isError, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    ...Api.posts.getUserLikedPostsInfinityQueryOptions(),
    initialData: { pages: [initialData], pageParams: [1] },
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const cursor = <div ref={ref} className="h-1 w-full bg-transparent" />;

  return { data, isPending, isError, cursor, isFetchingNextPage };
};

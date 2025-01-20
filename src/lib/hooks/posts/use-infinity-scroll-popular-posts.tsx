import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Api } from '@/services/api-client';
import { InfinityResponse } from '../../../../@types/response';
import { Post } from '../../../../@types/dto';

export const useInfinityScrollPopularPosts = ({
  initialPosts,
}: {
  initialPosts: InfinityResponse<Post[]>;
}) => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    ...Api.posts.getAllPopularPostsInfinityQueryOptions(),
    initialData: { pages: [initialPosts], pageParams: [1] },
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const cursor = <div ref={ref} className="h-1 w-full bg-transparent" />;

  return { data, cursor, isFetchingNextPage };
};

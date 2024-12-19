import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Api } from '@/services/api-client';

export const useInfinityScrollPostsByUserId = ({ userId }: { userId: string }) => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage } = useInfiniteQuery({
    ...Api.posts.getPostsByUserIdInfinityQueryOptions(userId),
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const cursor = <div ref={ref} className="h-1 w-full bg-transparent" />;

  return { data, cursor };
};

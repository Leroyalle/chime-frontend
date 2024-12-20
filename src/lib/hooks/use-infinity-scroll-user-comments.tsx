import { Api } from '@/services/api-client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const useInfinityScrollUserComments = ({ userId }: { userId: string }) => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    ...Api.comments.getUserCommentsInfinityQueryOptions(userId),
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const cursor = <div ref={ref} className="h-1 w-full bg-transparent" />;

  return { data, cursor, isFetchingNextPage };
};

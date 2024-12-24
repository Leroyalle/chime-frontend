import { Api } from '@/services/api-client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Follows } from '../../../../@types/dto';
import { InfinityResponse } from '../../../../@types/newResponse';

export const useInfinityScrollUserFollowers = ({
  userId,
  initialData,
}: {
  userId: string;
  initialData: InfinityResponse<Omit<Follows, 'following'>[]>;
}) => {
  const { ref, inView } = useInView();

  const { data, isPending, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    ...Api.follow.getFollowersInfinityQueryOptions(userId),
    initialData: { pages: [initialData], pageParams: [1] },
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const cursor = <div ref={ref} className="h-1 w-full bg-transparent" />;

  return { data, isPending, cursor, isFetchingNextPage };
};

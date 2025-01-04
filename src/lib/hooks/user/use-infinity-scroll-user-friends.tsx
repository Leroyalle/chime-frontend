import { Api } from '@/services/api-client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { InfinityResponse } from '../../../../@types/newResponse';
import { Friend } from '../../../../@types/newDto';

export const useInfinityScrollUserFriends = ({
  userId,
  initialData,
}: {
  userId: string;
  initialData: InfinityResponse<Friend[]>;
}) => {
  const { ref, inView } = useInView();

  const { data, isPending, isError, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    ...Api.follow.getFriendsInfinityQueryOptions(userId),
    initialData: { pages: [initialData], pageParams: [1] },
    enabled: !!userId,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const cursor = <div ref={ref} className="h-1 w-full bg-transparent" />;

  return { data, cursor, isPending, isError, isFetchingNextPage };
};

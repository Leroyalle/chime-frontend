import { Api } from '@/services/api-client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { FollowingWithUser } from '../../../@types/newResponse';

export const useInfinityScrollUserFollowing = ({
  userId,
  initialData,
}: {
  userId: string;
  initialData: FollowingWithUser;
}) => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    ...Api.follow.getFollowingInfinityQueryOptions(userId),
    initialData: { pages: [initialData], pageParams: [1] },
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const cursor = <div ref={ref} className="h-1 w-full bg-transparent" />;

  return { data, cursor, isFetchingNextPage };
};
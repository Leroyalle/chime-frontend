import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Api } from '@/services/api-client';
import { PostsDto } from '../../../@types/response';

export const useInfinityScrollPosts = ({ initialPosts }: { initialPosts: PostsDto }) => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['posts', 'list'],
    queryFn: (meta) => Api.posts.getAllPosts({ page: meta.pageParam, perPage: 10 }),
    initialData: { pages: [initialPosts], pageParams: [1] },
    initialPageParam: 1,
    select: ({ pages }) => pages.flatMap((page) => page.data),
    getNextPageParam(lastPage, allPages) {
      return lastPage.data.length > 0 ? allPages.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const cursor = <div ref={ref} className="h-1 w-full bg-transparent" />;

  return { data, cursor };
};

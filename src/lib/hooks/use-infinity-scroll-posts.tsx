import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Api } from '@/services/api-client';
import { PostsDto } from '../../../@types/response';

export const useInfinityScrollPosts = ({ initialPosts }: { initialPosts: PostsDto }) => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage } = useInfiniteQuery({
    ...Api.posts.getAllPostsInfinityQueryOptions(),
    initialData: { pages: [initialPosts], pageParams: [1] },
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const cursor = <div ref={ref} className="h-1 w-full bg-transparent" />;

  return { data, cursor };
};

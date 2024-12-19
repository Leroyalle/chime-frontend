import React from 'react';
import { useInfinityScrollPostsByUserId } from '@/lib/hooks';
import { PostsList } from '@/components/shared/posts-list';
import { Spinner } from '@nextui-org/react';

interface Props {
  userId: string;
}

export const PostsTab: React.FC<Props> = ({ userId }) => {
  const {
    data: posts,
    cursor,
    isFetchingNextPage,
  } = useInfinityScrollPostsByUserId({
    userId,
  });
  if (!posts) return null;

  return (
    <>
      <PostsList items={posts} />
      {cursor}
      {isFetchingNextPage && <Spinner color="warning" className="w-full mx-auto mb-2" />}
    </>
  );
};

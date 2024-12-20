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

  if (!posts) {
    return <h3>У пользователя нет записей</h3>;
  }

  return (
    <>
      <PostsList items={posts} className="w-full" />
      {cursor}
      {isFetchingNextPage && <Spinner color="warning" className="w-full mx-auto mb-2" />}
    </>
  );
};

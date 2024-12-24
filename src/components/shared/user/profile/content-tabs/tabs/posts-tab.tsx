import React from 'react';
import { useInfinityScrollPostsByUserId } from '@/lib/hooks';
import { PostsList } from '@/components/shared/posts-list';
import { Spinner } from '@nextui-org/react';
import { EmptyState } from '@/components/shared/empty-state';

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

  if (!posts || posts.length === 0) {
    return <EmptyState title="У пользователя нет постов" text="Он явно ждет своего часа..." />;
  }

  return (
    <>
      <PostsList items={posts} className="w-full" />
      {cursor}
      {isFetchingNextPage && <Spinner color="warning" className="w-full mx-auto mb-2" />}
    </>
  );
};

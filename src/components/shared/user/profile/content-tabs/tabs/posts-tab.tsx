import React from 'react';
import { useInfinityScrollPostsByUserId } from '@/lib/hooks';
import { PostsList } from '@/components/shared/posts-list';

interface Props {
  userId: string;
}

export const PostsTab: React.FC<Props> = ({ userId }) => {
  const { data: posts } = useInfinityScrollPostsByUserId({
    userId,
  });
  if (!posts) return null;

  return <PostsList items={posts} />;
};

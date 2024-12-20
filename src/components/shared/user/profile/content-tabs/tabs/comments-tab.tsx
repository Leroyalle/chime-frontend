import React from 'react';
import { useInfinityScrollUserComments } from '@/lib/hooks';
import { Spinner } from '@nextui-org/react';
import { CommentsList } from '@/components/shared/comments/comments-list';

interface Props {
  userId: string;
}

export const CommentsTab: React.FC<Props> = ({ userId }) => {
  const { data: comments, cursor, isFetchingNextPage } = useInfinityScrollUserComments({ userId });

  if (!comments) {
    return <h3>У пользователя нет комментариев</h3>;
  }

  return (
    <>
      <CommentsList items={comments} />
      {cursor}
      {isFetchingNextPage && <Spinner color="warning" className="w-full mx-auto mb-2" />}
    </>
  );
};

import React from 'react';
import { useInfinityScrollUserComments } from '@/lib/hooks';
import { Spinner } from '@nextui-org/react';
import { CommentsList } from '@/components/shared/comments/comments-list';
import { EmptyState } from '@/components/shared/empty-state';

interface Props {
  userId: string;
}

export const CommentsTab: React.FC<Props> = ({ userId }) => {
  const { data: comments, cursor, isFetchingNextPage } = useInfinityScrollUserComments({ userId });

  if (!comments || comments.length === 0) {
    return (
      <EmptyState title="У пользователя нет комментариев" text="Напишите ему, спросите почему?" />
    );
  }

  return (
    <>
      <CommentsList items={comments} />
      {cursor}
      {isFetchingNextPage && <Spinner color="warning" className="w-full mx-auto mb-2" />}
    </>
  );
};

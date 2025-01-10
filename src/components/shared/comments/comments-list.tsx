import React from 'react';
import { cn } from '@/lib/utils';
import { Comment } from '../../../../@types/newDto';
import { CommentItem } from './comment';
import { useGetMe } from '@/lib/hooks';

interface Props {
  items: Comment[];
  className?: string;
}

export const CommentsList: React.FC<Props> = ({ items, className }) => {
  const { data: userData } = useGetMe();
  return (
    <div className={cn('', className)}>
      {items.map((item) => (
        <CommentItem
          key={item.id}
          id={item.id}
          postId={item.postId}
          authorId={item.user.id}
          author={item.user.name}
          avatar={item.user.avatarUrl || ''}
          content={item.content}
          createdAt={item.createdAt}
          isOwner={userData?.user.id === item.user.id}
          className="mb-3"
        />
      ))}
    </div>
  );
};

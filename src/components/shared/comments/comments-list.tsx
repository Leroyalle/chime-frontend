import React from 'react';
import { cn } from '@/lib/utils';
import { Comment } from '../../../../@types/newDto';
import { CommentItem } from './comment-item';

interface Props {
  items: Comment[];
  className?: string;
}

export const CommentsList: React.FC<Props> = ({ items, className }) => {
  return (
    <div className={cn('', className)}>
      {items.map((item) => (
        <CommentItem
          key={item.id}
          className="mb-3"
          author={item.user.name}
          avatar={''}
          content={item.content}
          createdAt={item.createdAt}
        />
      ))}
    </div>
  );
};

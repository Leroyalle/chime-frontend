import React from 'react';
import { cn } from '@/lib/utils';
import { Comment } from '@/@types/dto';
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
          avatar={item.user.avatarUrl}
          content={item.content}
          createdAt={new Date('2022-01-01')}
        />
      ))}
    </div>
  );
};

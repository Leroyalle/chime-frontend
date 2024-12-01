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
      <CommentItem
        key="1"
        className="mb-3"
        author="John Doe"
        avatar="https://avatars.githubusercontent.com/u/158848927?v=4"
        content="This is a test comment 1"
        createdAt={new Date('2022-01-01')}
      />
      <CommentItem
        key="2"
        className="mb-3"
        author="Jane Doe"
        avatar="https://avatars.githubusercontent.com/u/158848927?v=4"
        content="This is a test comment 2"
        createdAt={new Date('2022-01-01')}
      />
    </div>
  );
};

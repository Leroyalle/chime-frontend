import React from 'react';
import { cn } from '@/lib/utils';
import { PostItem } from '../../post-item';
import { Post } from '../../../../../@types/dto';

interface Props {
  items?: Post[];
  className?: string;
}

export const PostsList: React.FC<Props> = ({ items, className }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className={cn('', className)}>
      {items.map((item, i) => (
        <PostItem
          key={item.id + i}
          postId={item.id}
          fullName={item.author.name}
          createdAt={item.createdAt}
          content={item.content}
          imageUrl={item.imageUrl}
          likeCount={item.likes.length}
          commentCount={item.comments.length}
          sharedCount={0}
          isLiked={item.isLiked}
          className="mb-10"
        />
      ))}
    </section>
  );
};

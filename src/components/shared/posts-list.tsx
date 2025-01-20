import React from 'react';
import { cn } from '@/lib/utils';
import { PostItem } from './post-item';
import { Post } from '../../../@types/dto';
import { useGetMe } from '@/lib/hooks';

interface Props {
  items: Post[];
  className?: string;
}

export const PostsList: React.FC<Props> = ({ items, className }) => {
  const { data: userData } = useGetMe();

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className={cn('', className)}>
      {items.map((item) => (
        <PostItem
          key={item.id}
          userId={item.authorId}
          postId={item.id}
          fullName={item.author.name}
          createdAt={item.createdAt}
          content={item.content}
          images={item.images}
          likeCount={item.likesCount}
          commentCount={item.commentsCount}
          sharedCount={0}
          isLiked={item.isLiked}
          isBookmarked={item.isBookmarked}
          isOwner={userData?.user.id === item.authorId}
          tags={item.tags}
          className="mb-10"
        />
      ))}
    </section>
  );
};

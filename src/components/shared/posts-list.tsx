import React from 'react';
import { cn } from '@/lib/utils';
import { PostItem } from './post-item';
import { Post } from '../../../@types/newDto';
import { User } from '../../../@types/newResponse';
import { useGetMe } from '@/lib/hooks';

interface Props {
  items: Post[];
  user: User;
  className?: string;
}

export const PostsList: React.FC<Props> = ({ items, className }) => {
  const { data: userData } = useGetMe();
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
          imageUrl={item.imageUrl || ''}
          likeCount={item.likesCount}
          commentCount={item.commentsCount}
          sharedCount={0}
          isLiked={item.isLiked}
          isOwner={userData?.user.id === item.authorId}
          className="mb-10"
        />
      ))}
    </section>
  );
};

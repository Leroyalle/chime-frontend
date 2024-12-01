import React from 'react';
import { cn } from '@/lib/utils';
import { PostItem } from '../post-item';
import { Post } from '@/@types/dto';
import { CommentSection } from './comment-section';

interface Props {
  item: Post;
  className?: string;
}

export const PostWrapper: React.FC<Props> = ({ item, className }) => {
  return (
    <div className={cn('', className)}>
      <section>
        <PostItem
          postId={item.id}
          fullName={item.author.name}
          createdAt={item.createdAt}
          content={item.content}
          imageUrl={item.imageUrl}
          likeCount={item.likes.length}
          commentCount={item.comments.length}
          sharedCount={0}
          isLiked={item.isLiked}
          className="mb-3"
        />
        <CommentSection postId={item.id} comments={item.comments} />
      </section>
    </div>
  );
};

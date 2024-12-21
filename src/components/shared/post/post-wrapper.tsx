'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { PostItem } from '../post-item';
import { Post } from '../../../../@types/newDto';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/services/api-client';
import { CommentSection } from './comment-section';

interface Props {
  initialData: Post;
  className?: string;
}

export const PostWrapper: React.FC<Props> = ({ initialData, className }) => {
  const { data: postItem } = useQuery({
    ...Api.posts.getPostByIdQueryOptions(initialData.id),
    initialData,
  });
  return (
    <div className={cn('', className)}>
      <section>
        <PostItem
          userId={postItem.authorId}
          postId={postItem.id}
          fullName={postItem.author.name}
          createdAt={postItem.createdAt}
          content={postItem.content}
          imageUrl={''}
          likeCount={postItem.likes.length}
          commentCount={postItem.comments.length}
          sharedCount={0}
          isLiked={postItem.isLiked}
          className="mb-3"
        />
        <CommentSection
          userId={postItem.authorId}
          postId={postItem.id}
          comments={postItem.comments}
        />
      </section>
    </div>
  );
};

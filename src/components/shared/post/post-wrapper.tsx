'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { PostItem } from '../post-item';
import { Post } from '../../../../@types/newDto';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/services/api-client';
import { CommentSection } from './comment-section';
import { useGetMe } from '@/lib/hooks';

interface Props {
  initialData: Post;
  className?: string;
}

export const PostWrapper: React.FC<Props> = ({ initialData, className }) => {
  const { data: userData } = useGetMe();
  const { data: postItem, isError } = useQuery({
    ...Api.posts.getPostByIdQueryOptions(initialData.id),
    initialData,
  });

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <section className={cn('w-full mx-auto relative', className)}>
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
        isOwner={userData?.user.id === postItem.authorId}
        className="mb-3"
      />
      <CommentSection
        userId={postItem.authorId}
        postId={postItem.id}
        comments={postItem.comments}
        pageType="post"
      />
    </section>
  );
};

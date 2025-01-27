'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { PostItem } from '../post-item';
import { Post } from '@/types';
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
        avatar={postItem.author.avatar}
        createdAt={postItem.createdAt}
        content={postItem.content}
        images={postItem.images}
        likeCount={postItem.likesCount}
        commentCount={postItem.commentsCount}
        isBookmarked={postItem.isBookmarked}
        sharedCount={0}
        isLiked={postItem.isLiked}
        isOwner={userData?.user.id === postItem.authorId}
        tags={postItem.tags}
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

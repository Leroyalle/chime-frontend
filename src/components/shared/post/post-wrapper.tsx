'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { PostItem } from '../post-item';
import { CommentSection } from './comment-section';
import { useGetPostByIdQuery } from '@/services/post-api';
import { notFound } from 'next/navigation';
interface Props {
  postId: string;
  className?: string;
}

export const PostWrapper: React.FC<Props> = ({ postId, className }) => {
  const { data: postItem } = useGetPostByIdQuery(postId);

  return (
    <div className={cn('', className)}>
      <section>
        <PostItem
          postId={postItem?.id}
          fullName={postItem?.author.name}
          createdAt={postItem?.createdAt}
          content={postItem?.content}
          imageUrl={postItem?.imageUrl}
          likeCount={postItem?.likes.length}
          commentCount={postItem?.comments.length}
          sharedCount={0}
          isLiked={postItem?.isLiked}
          className="mb-3"
        />
        {/* <CommentSection postId={postItem?.id} comments={postItem?.comments} /> */}
      </section>
    </div>
  );
};

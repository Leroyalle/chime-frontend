'use client';
import React from 'react';
import { WriteComment } from '../write-comment';
import { CommentsList } from '../comments/comments-list';
import { Comment } from '../../../../@types/newDto';

interface Props {
  userId: string;
  postId: string;
  comments: Comment[];
}

export const CommentSection: React.FC<Props> = ({ userId, postId, comments }) => {
  return (
    <>
      <CommentsList items={comments} className="mb-3" />
      <WriteComment userId={userId} postId={postId} className="mb-3 sticky bottom-2" />
    </>
  );
};

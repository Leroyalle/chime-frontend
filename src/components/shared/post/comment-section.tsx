'use client';
import React from 'react';
import { WriteComment } from '../write-comment';
import { CommentsList } from '../comments/comments-list';
import { Comment } from '../../../../@types/newDto';

interface Props {
  postId: string;
  comments: Comment[];
}

export const CommentSection: React.FC<Props> = ({ postId, comments }) => {
  return (
    <>
      <WriteComment postId={postId} className="mb-3" />
      <CommentsList items={comments} className="mb-3" />
    </>
  );
};

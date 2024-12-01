'use client';
import React, { useState } from 'react';
import { WriteComment } from '../write-comment';
import { CommentsList } from '../comments/comments-list';
import { Comment } from '@/@types/dto';

interface Props {
  postId: string;
  comments: Comment[];
}

export const CommentSection: React.FC<Props> = ({ postId, comments }) => {
  const [commentsState, setCommentsState] = useState(comments);
  const onWriteComment = (comment: Comment) => {
    setCommentsState((prev) => [comment, ...prev]);
  };
  return (
    <>
      <WriteComment postId={postId} className="mb-3" onWriteComment={onWriteComment} />
      <CommentsList items={commentsState} className="mb-3" />
    </>
  );
};

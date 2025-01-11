'use client';
import React, { useState } from 'react';
import { WriteComment } from '../write-comment';
import { CommentsList, PageType } from '../comments/comments-list';
import { Comment } from '../../../../@types/newDto';

interface Props {
  userId: string;
  postId: string;
  comments: Comment[];
  pageType: PageType;
}

export const CommentSection: React.FC<Props> = ({ userId, postId, comments, pageType }) => {
  const [editableComment, setEditableComment] = useState<Comment | null>(null);

  return (
    <>
      <CommentsList
        items={comments}
        pageType={pageType}
        className="mb-3"
        onClickEditComment={setEditableComment}
      />
      <WriteComment
        userId={userId}
        postId={postId}
        editableComment={editableComment}
        cancelEdit={() => setEditableComment(null)}
        className="mb-3 sticky bottom-2"
      />
    </>
  );
};

import React from 'react';
import { PostsList } from './posts';
import { WritePost } from '../write-post';

interface Props {
  className?: string;
}

export const FeedWrapper: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <WritePost className="mb-10" />
      <PostsList />
    </div>
  );
};

'use client';
import React from 'react';
import { PostsList } from './posts';
import { WritePost } from '../write-post';
import { useGetAllPostsQuery } from '@/services/post-api';

interface Props {
  className?: string;
}

export const FeedWrapper: React.FC<Props> = ({ className }) => {
  const { data } = useGetAllPostsQuery({ skip: 0, take: 10 });
  console.log(data);
  return (
    <div className={className}>
      <WritePost className="mb-10" />
      <PostsList />
    </div>
  );
};

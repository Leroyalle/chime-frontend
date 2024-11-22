import React from 'react';
import { cn } from '@/lib/utils';
import { Heart, MessageCircle, Undo2 } from 'lucide-react';
import { PostBottomActionsItem } from './post-bottom-actions-item';
import Link from 'next/link';

interface Props {
  postId: number;
  likes: number;
  comments: number;
  shared: number;
  className?: string;
}

export const PostBottomActions: React.FC<Props> = ({
  postId,
  likes,
  comments,
  shared,
  className,
}) => {
  return (
    <div className={cn('flex items-center gap-x-3', className)}>
      <PostBottomActionsItem count={likes} icon={<Heart size={20} />} />
      <Link href={`/post/${postId}`}>
        <PostBottomActionsItem count={comments} icon={<MessageCircle size={20} />} />
      </Link>
      <PostBottomActionsItem count={shared} icon={<Undo2 size={20} />} />
    </div>
  );
};

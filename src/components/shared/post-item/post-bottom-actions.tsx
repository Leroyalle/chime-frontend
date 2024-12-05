'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { Heart, MessageCircle, Undo2 } from 'lucide-react';
import { PostBottomActionsItem } from './post-bottom-actions-item';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  postId: string;
  likes: number;
  comments: number;
  shared: number;
  isLiked: boolean;
  className?: string;
}

export const PostBottomActions: React.FC<Props> = ({
  postId,
  likes,
  comments,
  shared,
  isLiked,
  className,
}) => {
  const pathName = usePathname();

  const onClickLikePost = async () => {
    if (isLiked) {
    } else {
    }
  };
  return (
    <div className={cn('flex items-center gap-x-3', className)}>
      <PostBottomActionsItem
        count={likes}
        onClick={onClickLikePost}
        // loading={isLoading || isLoadingDelete}
        icon={<Heart size={20} className={isLiked ? 'fill-red-500 text-red-500' : 'text-black'} />}
      />
      {!pathName.startsWith('/post/') && (
        <Link href={`/post/${postId}`}>
          <PostBottomActionsItem count={comments} icon={<MessageCircle size={20} />} />
        </Link>
      )}
      <PostBottomActionsItem count={shared} icon={<Undo2 size={20} />} />
    </div>
  );
};

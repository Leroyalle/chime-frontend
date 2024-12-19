'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { Heart, MessageCircle, Undo2 } from 'lucide-react';
import { PostBottomActionsItem } from './post-bottom-actions-item';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLikePost, useUnlikePost } from '@/lib/hooks';
import { RoutesEnum } from '../../../../@types';

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
  const { likePost, isPending: isPendingLike } = useLikePost(postId);
  const { unlikePost, isPending: isPendingUnlike } = useUnlikePost(postId);

  const onClickLikePost = async () => {
    if (isLiked) {
      unlikePost();
    } else {
      likePost();
    }
  };
  return (
    <div className={cn('flex items-center gap-x-3', className)}>
      <PostBottomActionsItem
        count={likes}
        onClick={onClickLikePost}
        loading={isPendingLike || isPendingUnlike}
        icon={<Heart size={20} className={isLiked ? 'fill-red-500 text-red-500' : 'text-black'} />}
      />
      {!pathName.startsWith(`${RoutesEnum.POST}/`) && (
        <Link href={`${RoutesEnum.POST}/${postId}`}>
          <PostBottomActionsItem count={comments} icon={<MessageCircle size={20} />} />
        </Link>
      )}
      <PostBottomActionsItem count={shared} icon={<Undo2 size={20} />} />
    </div>
  );
};

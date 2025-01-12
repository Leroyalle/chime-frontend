'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { Bookmark, Heart, MessageCircle, Undo2 } from 'lucide-react';
import { PostBottomActionsItem } from './post-bottom-actions-item';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLikePost, useUnlikePost } from '@/lib/hooks';
import { RoutesEnum } from '../../../../@types';

interface Props {
  userId: string;
  postId: string;
  likes: number;
  comments: number;
  shared: number;
  isLiked: boolean;
  className?: string;
}

export const PostBottomActions: React.FC<Props> = ({
  userId,
  postId,
  likes,
  comments,
  shared,
  isLiked,
  className,
}) => {
  const pathName = usePathname();
  const { likePost, isPending: isPendingLike } = useLikePost(postId, userId);
  const { unlikePost, isPending: isPendingUnlike } = useUnlikePost(postId, userId);

  const onClickLikePost = async () => {
    if (isLiked) {
      unlikePost();
    } else {
      likePost();
    }
  };
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className={'flex items-center gap-x-3 w-full'}>
        <PostBottomActionsItem
          count={likes}
          onClick={onClickLikePost}
          loading={isPendingLike || isPendingUnlike}
          icon={
            <Heart
              size={20}
              className={isLiked ? 'fill-red-500 text-red-500' : 'text-foreground'}
            />
          }
        />
        {!pathName.startsWith(`${RoutesEnum.POST}/`) && (
          <Link href={`${RoutesEnum.POST}/${postId}`}>
            <PostBottomActionsItem count={comments} icon={<MessageCircle size={20} />} />
          </Link>
        )}
        <PostBottomActionsItem count={shared} icon={<Undo2 size={20} />} />
      </div>
      <PostBottomActionsItem icon={<Bookmark size={20} className="text-purple-500" />} />
    </div>
  );
};

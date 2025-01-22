'use client';
import React, { useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Bookmark, Heart, MessageCircle } from 'lucide-react';
import { PostBottomActionsItem } from './post-bottom-actions-item';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAddBookmark, useLikePost, useRemoveBookmark, useUnlikePost } from '@/lib/hooks';
import { SharedBody } from './shared-body';
import { useSharedPostSlice } from '@/store';
import { Image, RoutesEnum } from '@/types';

interface Props {
  userId: string;
  postId: string;
  content: string;
  images: Image[] | null;
  likes: number;
  comments: number;
  shared: number;
  isLiked: boolean;
  isBookmarked: boolean;
  className?: string;
}

export const PostBottomActions: React.FC<Props> = ({
  userId,
  postId,
  content,
  images,
  likes,
  comments,
  shared,
  isLiked,
  isBookmarked,
  className,
}) => {
  console.log('IMAGES:', images);
  const pathName = usePathname();
  const { likePost, isPending: isPendingLike } = useLikePost(postId, userId);
  const { unlikePost, isPending: isPendingUnlike } = useUnlikePost(postId, userId);
  const { addBookmark, isPending: isPendingAddBookmark } = useAddBookmark(postId, userId);
  const { removeBookmark, isPending: isPendingRemoveBookmark } = useRemoveBookmark(postId, userId);
  const setSharedPost = useSharedPostSlice((store) => store.setSharedPost);

  const handleLikePost = useCallback(async () => {
    if (isLiked) {
      unlikePost();
    } else {
      likePost();
    }
  }, [isLiked, likePost, unlikePost]);

  const handleAddBookmark = useCallback(async () => {
    if (isBookmarked) {
      removeBookmark();
    } else {
      addBookmark();
    }
  }, [isBookmarked, addBookmark, removeBookmark]);

  const handleSharePost = useCallback(() => {
    setSharedPost({
      postId,
      contentPost: content,
      imagePreview: images && images.length ? images[0].url : null,
    });
  }, [setSharedPost, content, postId]);

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className={'flex items-center gap-x-3 w-full'}>
        <PostBottomActionsItem
          count={likes}
          onClick={handleLikePost}
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
        <SharedBody shared={shared} onClick={handleSharePost} />
      </div>
      <PostBottomActionsItem
        onClick={handleAddBookmark}
        loading={isPendingAddBookmark || isPendingRemoveBookmark}
        icon={
          <Bookmark
            size={20}
            className={cn('text-purple-500', isBookmarked && 'fill-purple-500')}
          />
        }
      />
    </div>
  );
};

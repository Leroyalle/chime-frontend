import React from 'react';
import { cn } from '@/lib/utils';
import { User } from '@nextui-org/react';
import Link from 'next/link';
import { getAbsoluteUrl, getRelativeTime } from '@/lib/utils';
import { Author, RoutesEnum } from '@/types';

interface Props {
  contentPost: string | null;
  imagePreview: string | null;
  postId: string | null;
  postAuthor: Author | null;
  postCreatedAt: Date | null;
  className?: string;
}

export const MessageSharedContent: React.FC<Props> = ({
  contentPost,
  imagePreview,
  postId,
  postAuthor,
  postCreatedAt,
  className,
}) => {
  const handleOpenPost = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className={cn('flex flex-col gap-y-1', className)}>
      <User
        name={<Link href={`${RoutesEnum.POST}/${postId}`}>{postAuthor?.name}</Link>}
        description={getRelativeTime(postCreatedAt)}
        avatarProps={{
          src: postAuthor?.avatar ? getAbsoluteUrl(postAuthor?.avatar) : undefined,
          size: 'sm',
        }}
        className="justify-start"
      />
      {imagePreview && (
        <img
          src={getAbsoluteUrl(imagePreview)}
          alt=""
          className="w-full h-full aspect-[1/1] object-cover rounded-md"
        />
      )}
      <p>{contentPost}</p>
      <div
        onPointerDown={handleOpenPost}
        onPointerUp={handleOpenPost}
        onClick={handleOpenPost}
        className="grid place-items-center text-blue-500 font-semibold border border-blue-500 p-1 rounded-lg">
        <Link href={`${RoutesEnum.POST}/${postId}`} className="w-full text-center">
          Открыть пост
        </Link>
      </div>
    </div>
  );
};

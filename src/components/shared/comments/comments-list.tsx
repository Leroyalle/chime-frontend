import React from 'react';
import { cn } from '@/lib/utils';
import { Comment } from '@/types';
import { CommentItem } from './comment';
import { useGetMe } from '@/lib/hooks';

export type PageType = 'user' | 'post';

interface Props {
  items: Comment[] | null;
  onClickEditComment?: (comment: Comment) => void;
  pageType: PageType;
  className?: string;
}

export const CommentsList: React.FC<Props> = ({
  items,
  onClickEditComment,
  pageType,
  className,
}) => {
  const { data: userData } = useGetMe();

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={cn('', className)}>
      {items.map((item) => (
        <CommentItem
          key={item.id}
          id={item.id}
          postId={item.postId}
          author={item.user}
          content={item.content}
          createdAt={item.createdAt}
          isOwner={userData?.user.id === item.user.id}
          onUpdate={() => {
            if (onClickEditComment) onClickEditComment(item);
          }}
          pageType={pageType}
          className="mb-3"
        />
      ))}
    </div>
  );
};

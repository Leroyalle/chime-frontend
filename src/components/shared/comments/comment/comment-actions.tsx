import React from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { Ellipsis } from 'lucide-react';
import { useDeleteComment } from '@/lib/hooks';
import { PageType } from '../comments-list';
import { useRouter } from 'next/navigation';
import { RoutesEnum } from '../../../../types';

interface Props {
  postId: string;
  commentId: string;
  userId: string;
  isOwner: boolean;
  pageType: PageType;
  onUpdate?: VoidFunction;
}

export const CommentActions: React.FC<Props> = ({
  postId,
  commentId,
  userId,
  isOwner,
  pageType,
  onUpdate,
}) => {
  const { deleteComment } = useDeleteComment({ postId, commentId, userId });
  const router = useRouter();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Ellipsis />
      </DropdownTrigger>
      <DropdownMenu aria-label="Post actions">
        <DropdownItem key="share">Пожаловаться</DropdownItem>

        {pageType === 'user' ? (
          <DropdownItem
            key="go-to-post"
            onPress={() => router.push(`${RoutesEnum.POST}/${postId}`)}>
            Перейти к посту
          </DropdownItem>
        ) : null}

        {pageType === 'post' && isOwner ? (
          <>
            <DropdownItem key="update" onPress={onUpdate}>
              Изменить
            </DropdownItem>
            <DropdownItem
              key="delete"
              color="danger"
              className="text-danger"
              onPress={() => deleteComment()}>
              Удалить
            </DropdownItem>
          </>
        ) : null}
      </DropdownMenu>
    </Dropdown>
  );
};

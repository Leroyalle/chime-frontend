import React from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { Ellipsis } from 'lucide-react';
import { useDeleteComment } from '@/lib/hooks';

interface Props {
  postId: string;
  commentId: string;
  userId: string;
  onUpdate: VoidFunction;
  isOwner: boolean;
}

export const CommentActions: React.FC<Props> = ({
  postId,
  commentId,
  userId,
  isOwner,
  onUpdate,
}) => {
  const { deleteComment } = useDeleteComment({ postId, commentId, userId });
  return (
    <Dropdown>
      <DropdownTrigger>
        <Ellipsis />
      </DropdownTrigger>
      <DropdownMenu aria-label="Post actions">
        <DropdownItem key="share">Пожаловаться</DropdownItem>
        {isOwner ? (
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

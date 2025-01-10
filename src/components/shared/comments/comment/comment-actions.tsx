import React from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { Ellipsis } from 'lucide-react';
import { useDeleteComment } from '@/lib/hooks';

interface Props {
  postId: string;
  commentId: string;
  isOwner: boolean;
}

export const CommentActions: React.FC<Props> = ({ postId, commentId, isOwner }) => {
  const { deleteComment } = useDeleteComment({ postId, commentId });
  return (
    <Dropdown>
      <DropdownTrigger>
        <Ellipsis />
      </DropdownTrigger>
      <DropdownMenu aria-label="Post actions">
        <DropdownItem key="share">Пожаловаться</DropdownItem>
        {isOwner ? (
          <>
            <DropdownItem key="update">Изменить</DropdownItem>
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

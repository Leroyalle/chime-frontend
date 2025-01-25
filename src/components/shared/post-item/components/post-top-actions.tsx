import React from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { Ellipsis } from 'lucide-react';
import { useDeletePost } from '@/lib/hooks';

interface Props {
  postId: string;
  userId: string;
  isOwner: boolean;
}

export const PostTopActions: React.FC<Props> = ({ postId, userId, isOwner }) => {
  const { deletePost } = useDeletePost(userId, postId);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Ellipsis />
      </DropdownTrigger>
      <DropdownMenu aria-label="Post actions">
        <DropdownItem key="share">Пожаловаться</DropdownItem>
        {isOwner ? (
          <DropdownItem
            key="delete"
            color="danger"
            className="text-danger"
            onPress={() => deletePost()}>
            Удалить
          </DropdownItem>
        ) : null}
      </DropdownMenu>
    </Dropdown>
  );
};

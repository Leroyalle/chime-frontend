import React from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { Ellipsis } from 'lucide-react';
import { useDeletePost } from '@/lib/hooks';

interface Props {
  postId: string;
  userId: string;
  isOwner: boolean;
}

export const PostHeadActions: React.FC<Props> = ({ postId, userId, isOwner }) => {
  const { deletePost } = useDeletePost(userId, postId);
  console.log(postId, userId);
  return (
    <Dropdown>
      <DropdownTrigger>
        <Ellipsis />
      </DropdownTrigger>
      <DropdownMenu aria-label="Post actions">
        <DropdownItem key="favorites">Сохранить в закладках</DropdownItem>
        <DropdownItem key="share">Поделиться</DropdownItem>
        {isOwner ? (
          <DropdownItem
            key="delete"
            color="danger"
            className="text-danger"
            onPress={() => deletePost()}>
            Удалить
          </DropdownItem>
        ) : (
          <DropdownItem key="report">Пожаловаться</DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

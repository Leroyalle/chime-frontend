import React from 'react';
import { DropdownItem, DropdownMenu } from '@nextui-org/react';

interface Props {
  isSender: boolean;
  onUpdate: VoidFunction;
  deleteMessage: VoidFunction;
}

export const MessageActions: React.FC<Props> = ({ isSender, onUpdate, deleteMessage }) => {
  return (
    <DropdownMenu aria-label="Chat actions">
      <DropdownItem key="report">Закрепить</DropdownItem>
      <>
        {isSender && (
          <>
            <DropdownItem key="update" onPress={onUpdate}>
              Изменить
            </DropdownItem>
            <DropdownItem
              key="delete"
              color="danger"
              className="text-danger"
              onPress={deleteMessage}>
              Удалить
            </DropdownItem>
          </>
        )}
      </>
    </DropdownMenu>
  );
};

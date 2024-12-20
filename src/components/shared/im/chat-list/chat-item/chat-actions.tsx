import React from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { Ellipsis } from 'lucide-react';

interface Props {
  className?: string;
}

export const ChatActions: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Dropdown>
        <DropdownTrigger>
          <Ellipsis />
        </DropdownTrigger>
        <DropdownMenu aria-label="Chat actions" onAction={(key) => alert(key)}>
          <DropdownItem key="report">Закрепить</DropdownItem>
          <DropdownItem key="delete" color="danger" className="text-danger">
            Удалить
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

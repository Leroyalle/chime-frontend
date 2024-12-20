'use client';
import React from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { Ellipsis } from 'lucide-react';

export const FriendActions: React.FC = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Ellipsis />
      </DropdownTrigger>
      <DropdownMenu aria-label="Post actions" onAction={(key) => alert(key)}>
        <DropdownItem key="report">Пожаловаться</DropdownItem>
        <DropdownItem key="delete" color="danger" className="text-danger">
          Удалить
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

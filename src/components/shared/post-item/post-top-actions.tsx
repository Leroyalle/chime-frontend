'use client';
import React from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { Ellipsis } from 'lucide-react';

export const PostHeadActions: React.FC = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Ellipsis />
      </DropdownTrigger>
      <DropdownMenu aria-label="Post actions" onAction={(key) => alert(key)}>
        <DropdownItem key="favorites">Сохранить в закладках</DropdownItem>
        <DropdownItem key="share">Поделиться</DropdownItem>
        <DropdownItem key="report">Пожаловаться</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/services/api-client';
import { ChatListShareMode } from '../../chat-list';
import { SearchChats } from '../../search-chats';
import { useDebounce } from '@/components/ui/shadcn-expendsions';

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
  className?: string;
}

export const SharedModal: React.FC<Props> = ({ isOpen, onClose, className }) => {
  const [searchValue, setSearchValue] = useState('');
  const searchQuery = useDebounce(searchValue, 500);
  const { data: chats } = useQuery({
    ...Api.chat.getUserChatsQueryOptions(searchQuery),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn('', className)}>
        <DialogHeader>
          <DialogTitle className="select-none">Поделиться:</DialogTitle>
          <DialogDescription className="sr-only">Send to friends</DialogDescription>
        </DialogHeader>
        <SearchChats value={searchValue} onChange={setSearchValue} />
        <ChatListShareMode items={chats} onCloseModal={onClose} hasActions={false} />
      </DialogContent>
    </Dialog>
  );
};

import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@nextui-org/react';

interface Props {
  className?: string;
}

export const SearchChats: React.FC<Props> = ({ className }) => {
  return (
    <form className={cn('w-full', className)}>
      <Input variant="bordered" autoComplete="off" isClearable placeholder="Поиск..." />
    </form>
  );
};

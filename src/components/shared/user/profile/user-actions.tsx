'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@nextui-org/react';
import { MessageCircleMore } from 'lucide-react';

interface Props {
  className?: string;
}

export const UserActions: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex items-center gap-x-2', className)}>
      <Button color="warning">Подписаться</Button>
      <Button color="default">
        <MessageCircleMore />
      </Button>
    </div>
  );
};

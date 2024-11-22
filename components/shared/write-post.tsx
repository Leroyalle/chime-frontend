import React from 'react';
import { cn } from '@/lib/utils';
import { Button, Textarea } from '@nextui-org/react';

interface Props {
  className?: string;
}

export const WritePost: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex flex-col gap-y-2', className)}>
      <Textarea placeholder="Что нового?" />
      <Button variant="solid" color="warning">
        Отправить
      </Button>
    </div>
  );
};

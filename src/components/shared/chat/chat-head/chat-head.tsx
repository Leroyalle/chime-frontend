import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/shared/avatar';

interface Props {
  className?: string;
}

export const ChatHead: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('relative p-2 flex gap-x-2', className)}>
      <Avatar
        src="https://avatars.githubusercontent.com/u/158848927?v=4"
        size="md"
        name="Николай"
        className="absolute top-1/2 left-2 -translate-y-1/2"
      />
      <h3 className="text-lg m-auto">Николай Мелонов</h3>
    </div>
  );
};

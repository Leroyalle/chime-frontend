import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const ImHead: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn('flex flex-col gap-y-2', className)}>
      <h2 className="text-2xl text-start">Мессенджер</h2>
    </header>
  );
};

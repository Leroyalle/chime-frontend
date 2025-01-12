import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn('w-full mb-6 select-none', className)}>
      <div className="flex gap-x-1 items-center justify-center">
        <img className="w-8 h-8" src="/logo.svg" alt="Chime" />
        <span className="text-2xl font-black">Chime</span>
      </div>
    </header>
  );
};

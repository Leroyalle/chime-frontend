import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const Logo: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex gap-x-1 items-center justify-center', className)}>
      <img className="w-8 h-8" src="/logo.svg" alt="Chime" />
      <span className="text-2xl font-black">Chime</span>
    </div>
  );
};

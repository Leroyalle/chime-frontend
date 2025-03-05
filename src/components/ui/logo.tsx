import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { RoutesEnum } from '@/types';

interface Props {
  className?: string;
}

export const Logo: React.FC<Props> = ({ className }) => {
  return (
    <Link
      href={RoutesEnum.HOME}
      className={cn('flex gap-x-1 items-center justify-center', className)}>
      <img className="w-8 h-8" src="/logo.svg" alt="Chime" />
      <span className="text-2xl font-black">Chime</span>
    </Link>
  );
};

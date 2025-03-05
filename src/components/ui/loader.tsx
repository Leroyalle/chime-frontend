import React from 'react';
import { cn } from '@/lib/utils';
import { Spinner } from '@nextui-org/react';

interface Props {
  className?: string;
}

export const Loader: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex items-center justify-center min-h-[200px]', className)}>
      <Spinner color="warning" className="mx-auto" />
    </div>
  );
};

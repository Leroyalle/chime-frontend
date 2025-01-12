import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  className?: string;
}

export const SectionTitle: React.FC<Props> = ({ title, className }) => {
  return (
    <h3 className={cn('text-xs font-semibold uppercase text-muted-foreground my-4', className)}>
      {title}
    </h3>
  );
};

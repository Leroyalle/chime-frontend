import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  children: ReactNode;
  className?: string;
}

export const DarkLightBlock: React.FC<Props> = ({ children, className }) => {
  return <div className={cn('bg-white rounded-xl w-full', className)}>{children}</div>;
};

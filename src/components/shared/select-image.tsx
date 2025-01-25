import React, { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const SelectImage: React.FC<Props> = ({ className, ...props }) => {
  return (
    <input className={cn('hidden', className)} type="file" {...props} accept=".png, .jpg, .jpeg" />
  );
};

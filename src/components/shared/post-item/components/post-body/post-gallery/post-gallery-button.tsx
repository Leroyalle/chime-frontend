import React from 'react';
import { cn } from '@/lib/utils';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: JSX.Element;
  disabled: boolean;
  className?: string;
}

export const PostGalleryButton: React.FC<Props> = ({ icon, disabled, className, ...props }) => {
  return (
    <button
      className={cn(
        'absolute top-1/2 -translate-y-1/2 opacity-100',
        disabled && 'opacity-0',
        className,
      )}
      {...props}>
      {icon}
    </button>
  );
};

import React from 'react';
import { cn } from '@/lib/utils';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: JSX.Element;
  className?: string;
}

export const PostGalleryButton: React.FC<Props> = ({ icon, className, ...props }) => {
  return (
    <button className={cn('absolute top-1/2 -translate-y-1/2 ', className)} {...props}>
      {icon}
    </button>
  );
};

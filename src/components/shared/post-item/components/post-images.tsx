import React from 'react';
import { cn } from '@/lib/utils';
import { getAbsoluteUrl } from '@/lib';
import { Image } from '../../../../../@types/newDto';

interface Props {
  items: Image[] | null;
  className?: string;
}

export const PostImages: React.FC<Props> = ({ items, className }) => {
  if (items && items.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        'grid [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] gap-2',
        className,
      )}>
      {items?.map((image, i) => (
        <img
          key={i}
          className="w-full h-full aspect-[1/1] object-cover rounded-md"
          src={getAbsoluteUrl(image.url)}
          alt={'Post image'}
        />
      ))}
    </div>
  );
};

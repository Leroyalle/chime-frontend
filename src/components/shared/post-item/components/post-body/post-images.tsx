import React from 'react';
import { cn } from '@/lib/utils';
import { getAbsoluteUrl } from '@/lib/utils';
import { Image } from '../../../../../types/dto';

interface Props {
  items: Image[] | null;
  onClick: (id: number) => void;
  className?: string;
}

export const PostImages: React.FC<Props> = ({ items, onClick, className }) => {
  if (items && items.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        'grid [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] gap-2 select-none',
        className,
      )}>
      {items?.map((image, i) => (
        <img
          key={i}
          onClick={() => onClick(i)}
          className="w-full h-full aspect-[1/1] object-cover rounded-md"
          src={getAbsoluteUrl(image.url)}
          alt={'Post image'}
        />
      ))}
    </div>
  );
};

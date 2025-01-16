import React from 'react';
import { cn } from '@/lib/utils';
import { getAbsoluteUrl } from '@/lib';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PostGalleryButton } from './post-gallery-button';

interface Props extends React.HTMLAttributes<HTMLImageElement> {
  imageUrl?: string;
  onClickNext: VoidFunction;
  onClickPrev: VoidFunction;
  className?: string;
}

export const PostGalleryItem: React.FC<Props> = ({
  imageUrl,
  onClickNext,
  onClickPrev,
  className,
  ...props
}) => {
  if (!imageUrl) {
    return null;
  }

  return (
    <div className="relative w-full h-full">
      <PostGalleryButton
        className="absolute left-0 top-1/2 transform -translate-y-1/2"
        icon={<ChevronLeft size={40} className="drop-shadow-[0px_0px_1px_black]" />}
        onClick={onClickPrev}
      />
      <div className="w-full h-full flex items-center justify-center">
        <img
          className={cn('object-contain max-w-full max-h-full', className)}
          src={getAbsoluteUrl(imageUrl)}
          alt=""
          {...props}
        />
      </div>
      <PostGalleryButton
        className="absolute right-0 top-1/2 transform -translate-y-1/2"
        icon={<ChevronRight size={40} className="drop-shadow-[0px_0px_1px_black]" />}
        onClick={onClickNext}
      />
    </div>
  );
};

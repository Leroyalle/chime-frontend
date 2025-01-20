import React from 'react';
import { cn } from '@/lib/utils';
import { getAbsoluteUrl } from '@/lib';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PostGalleryButton } from './post-gallery-button';
import { Image } from '../../../../../../../@types/dto';

interface Props extends React.HTMLAttributes<HTMLImageElement> {
  currentIndex: number;
  images: Image[] | null;
  onClickNext: VoidFunction;
  onClickPrev: VoidFunction;
  className?: string;
}

export const PostGalleryItem: React.FC<Props> = ({
  currentIndex,
  images,
  onClickNext,
  onClickPrev,
  className,
  ...props
}) => {
  if (!images) {
    return null;
  }

  return (
    <div className="relative w-full h-full">
      <PostGalleryButton
        icon={<ChevronLeft size={40} className="drop-shadow-[0px_0px_1px_black]" />}
        disabled={currentIndex === 0}
        onClick={onClickPrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2"
      />
      <div className="w-full h-full flex items-center justify-center">
        <img
          className={cn('object-contain max-w-full max-h-full', className)}
          src={getAbsoluteUrl(images[currentIndex].url)}
          alt=""
          {...props}
        />
      </div>
      <PostGalleryButton
        icon={<ChevronRight size={40} className="drop-shadow-[0px_0px_1px_black]" />}
        disabled={currentIndex >= images?.length - 1}
        onClick={onClickNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2"
      />
    </div>
  );
};

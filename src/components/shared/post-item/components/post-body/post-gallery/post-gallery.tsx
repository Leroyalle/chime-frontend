import React from 'react';
import { Image } from '../../../../../../types/dto';
import { PostGalleryItem } from './post-gallery-item';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui';

interface Props {
  currentIndex: number;
  images: Image[] | null;
  onClickPrev: VoidFunction;
  onClickNext: VoidFunction;
  isOpen: boolean;
  onClose: VoidFunction;
}

export const PostGallery: React.FC<Props> = ({
  currentIndex,
  images,
  onClickNext,
  onClickPrev,
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 w-full max-w-[calc(100vw-100px)] h-full max-h-[calc(100vh-100px)] flex items-center justify-center">
        <DialogHeader className="sr-only">
          <DialogTitle>Image Gallery</DialogTitle>
          <DialogDescription>Navigate through the images in the gallery.</DialogDescription>
        </DialogHeader>
        <div className="relative w-full h-full flex items-center justify-center">
          <PostGalleryItem
            currentIndex={currentIndex}
            images={images}
            onClickNext={onClickNext}
            onClickPrev={onClickPrev}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

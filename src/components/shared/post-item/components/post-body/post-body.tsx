import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { PostContent } from './post-content';
import { PostImages } from './post-images';
import { PostTags } from './post-tags';
import { Image, Tag } from '../../../../../../@types/newDto';
import { PostGallery } from './post-gallery';

interface Props {
  content: string;
  images: Image[] | null;
  tags: Tag[];
  className?: string;
}

export const PostBody: React.FC<Props> = ({ content, images, tags, className }) => {
  const [isOpenGallery, setIsOpenGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleClickImage = (i: number) => {
    setCurrentIndex(i);
    setIsOpenGallery(true);
  };

  const onClickPrev = () => {
    if (images?.length && currentIndex - 1 >= 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const onClickNext = () => {
    if (images?.length && currentIndex + 1 < images.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <>
      <div className={cn('flex flex-col gap-y-1', className)}>
        <PostContent content={content} className="mb-2" />
        <PostImages items={images} onClick={handleClickImage} />
        <PostTags tags={tags} />
      </div>
      <PostGallery
        onClickPrev={onClickPrev}
        onClickNext={onClickNext}
        currentIndex={currentIndex}
        isOpen={isOpenGallery}
        onClose={() => setIsOpenGallery(false)}
        images={images}
      />
    </>
  );
};

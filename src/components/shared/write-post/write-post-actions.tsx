import React from 'react';
import { cn } from '@/lib/utils';
import { Camera, Hash } from 'lucide-react';
import { SelectImage } from '../select-image';
import { Button } from '@/components/ui';
import { Button as ButtonUI } from '@nextui-org/react';

interface Props {
  isPendingCreate?: boolean;
  tagsIsOpen: boolean;
  setTagsIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const WritePostActions: React.FC<Props> = ({
  isPendingCreate,
  tagsIsOpen,
  setTagsIsOpen,
  onChangeFile,
  className,
}) => {
  return (
    <div className={cn('flex items-center justify-between flex-wrap gap-y-1', className)}>
      <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="border-none"
          disabled={isPendingCreate}>
          <label className="flex items-center gap-x-2" htmlFor="postImage">
            <Camera size={15} /> Добавить фото
            <SelectImage name="postImage" id="postImage" onChange={onChangeFile} multiple />
          </label>
        </Button>
        <Button
          onClick={() => setTagsIsOpen(!tagsIsOpen)}
          variant="ghost"
          size="sm"
          className="border-none flex items-center gap-x-2">
          <Hash size={15} /> Хэштег
        </Button>
      </div>
      <ButtonUI type="submit" size="sm" className="p-2" isLoading={isPendingCreate}>
        Отправить
      </ButtonUI>
    </div>
  );
};

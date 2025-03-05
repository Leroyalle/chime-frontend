import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@nextui-org/react';
import { Camera, Hash } from 'lucide-react';

interface Props {
  isPendingCreate?: boolean;
  tagsIsOpen: boolean;
  setTagsIsOpen: React.Dispatch<React.SetStateAction<boolean>>;

  className?: string;
}

export const WritePostActions: React.FC<Props> = ({
  isPendingCreate,
  tagsIsOpen,
  setTagsIsOpen,
  className,
}) => {
  return (
    <div className={cn('flex items-center justify-between flex-wrap gap-y-1', className)}>
      <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
        <Button
          startContent={<Camera size={15} />}
          variant="ghost"
          size="sm"
          as="label"
          htmlFor="postImage"
          className="border-none"
          disabled={isPendingCreate}>
          Добавить фото
        </Button>
        <Button
          onPress={() => setTagsIsOpen(!tagsIsOpen)}
          startContent={<Hash size={15} />}
          variant="ghost"
          size="sm"
          className="border-none">
          Хэштег
        </Button>
      </div>
      <Button variant="solid" type="submit" size="sm" className="p-2" isLoading={isPendingCreate}>
        Отправить
      </Button>
    </div>
  );
};

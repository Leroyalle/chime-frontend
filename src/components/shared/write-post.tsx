import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, Button, Input } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';
import { hasErrorField } from '@/lib';
import { useCreatePost } from '@/lib/hooks';
import { DarkLightBlock, MultipleSelectorCreatable } from '../ui';
import { Camera, Hash } from 'lucide-react';
import { Option } from '../ui/shadcn-expendsions';
import { toast } from 'react-toastify';

interface Props {
  avatarUrl: string | null;
  className?: string;
}

export const WritePost: React.FC<Props> = ({ avatarUrl, className }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tagsIsOpen, setTagsIsOpen] = useState(false);
  const [tags, setTags] = useState<Option[]>([]);
  const { createPost, isPending: isPendingCreate } = useCreatePost();

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const { handleSubmit, control, setValue } = useForm<{ post: string }>({
    defaultValues: {
      post: '',
    },
  });

  const onSubmit = async (data: { post: string }) => {
    try {
      const formData = new FormData();
      formData.append('content', data.post);
      if (selectedFile) formData.append('postImage', selectedFile);
      if (tags.length > 0) formData.append('tags', JSON.stringify(tags));
      createPost({ postData: formData });
      setSelectedFile(null);
      setValue('post', '');
      setTags([]);
    } catch (error) {
      if (hasErrorField(error)) {
        console.error(error.data.error);
        toast.error('Не удалось создать пост! Попробуйте еще раз');
      }
    }
  };

  return (
    <DarkLightBlock className={cn('p-4', className)}>
      <form className={'flex flex-col gap-y-2'} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-x-3">
          <Avatar src={avatarUrl || ''} size="md" className="self-start" />
          <div className="w-full flex flex-col gap-y-2">
            <Controller
              control={control}
              name="post"
              rules={{
                required: 'Обязательное поле',
              }}
              render={({ field }) => (
                <Input
                  variant="bordered"
                  isClearable
                  onClear={() => setValue('post', '')}
                  placeholder="Что нового?"
                  {...field}
                />
              )}
            />
            <input
              id="postImage"
              type="file"
              name="postImage"
              className="hidden"
              onChange={onChangeFile}
              accept=".png, .jpg, .jpeg"
            />
            {tagsIsOpen && <MultipleSelectorCreatable value={tags} setValue={setTags} />}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <Button
              startContent={<Camera size={15} />}
              variant="ghost"
              size="sm"
              className="border-none"
              disabled={isPendingCreate}>
              <label className="grid place-items-center w-full h-full" htmlFor="postImage">
                Добавить фото
              </label>
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
          <Button
            variant="solid"
            type="submit"
            size="sm"
            className="p-2"
            isLoading={isPendingCreate}>
            Отправить
          </Button>
        </div>
      </form>
    </DarkLightBlock>
  );
};

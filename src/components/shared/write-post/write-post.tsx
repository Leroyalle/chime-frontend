import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, Input } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';
import { hasErrorField } from '@/lib';
import { useCreatePost } from '@/lib/hooks';
import { DarkLightBlock, MultipleSelectorCreatable } from '../../ui';
import { Option } from '../../ui/shadcn-expendsions';
import { toast } from 'react-toastify';
import { SelectedImages } from './selected-images';
import { WritePostActions } from './write-post-actions';

interface Props {
  avatarUrl: string | null;
  className?: string;
}

export const WritePost: React.FC<Props> = ({ avatarUrl, className }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [tagsIsOpen, setTagsIsOpen] = useState(false);
  const [tags, setTags] = useState<Option[]>([]);
  const { createPost, isPending: isPendingCreate } = useCreatePost();

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      if (selectedFiles.length + files.length > 4) {
        toast.error('Вы можете загрузить не более 4 файлов');
        return;
      }

      const newSelectedFiles = Array.from(files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newSelectedFiles]);
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

      selectedFiles.forEach((file) => {
        formData.append(`postImages`, file);
      });

      if (tags.length > 0) {
        formData.append('tags', JSON.stringify(tags));
      }

      createPost({ postData: formData });
      setSelectedFiles([]);
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
          <Avatar
            src={avatarUrl || 'https://avatars.githubusercontent.com/u/158848927?v=4'}
            size="md"
            className="self-start flex-shrink-0"
          />
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
                  autoComplete="off"
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
              multiple
            />
            {tagsIsOpen && <MultipleSelectorCreatable value={tags} setValue={setTags} />}
          </div>
        </div>
        <SelectedImages selectedFiles={selectedFiles} onDelete={setSelectedFiles} />
        <WritePostActions
          isPendingCreate={isPendingCreate}
          tagsIsOpen={tagsIsOpen}
          setTagsIsOpen={setTagsIsOpen}
        />
      </form>
    </DarkLightBlock>
  );
};

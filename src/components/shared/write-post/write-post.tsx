import React, { useState } from 'react';
import { cn, getAbsoluteUrl } from '@/lib/utils';
import { Avatar, Input } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';
import { hasErrorField } from '@/lib/utils';
import { useCreatePost } from '@/lib/hooks';
import { DarkLightBlock, Line, MultipleSelectorCreatable, Option } from '../../ui';
import { toast } from 'sonner';
import { SelectedImages } from './selected-images';
import { WritePostActions } from './write-post-actions';
import { SelectImage } from '../select-image';

interface Props {
  avatar: string | null;
  className?: string;
}

export const WritePost: React.FC<Props> = ({ avatar, className }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [tagsIsOpen, setTagsIsOpen] = useState(false);
  const [tags, setTags] = useState<Option[]>([]);
  const { createPost, isPending: isPendingCreate } = useCreatePost();

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      if (selectedFiles.length + files.length > 4) {
        toast.error('Можно загрузить не более 4 файлов', {
          description: 'Удалите на свой вкус',
        });
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
      if (tags.length > 0) formData.append('tags', JSON.stringify(tags));

      createPost({ postData: formData });
      setSelectedFiles([]);
      setValue('post', '');
      setTags([]);
    } catch (error) {
      if (hasErrorField(error)) {
        console.error(error);
        toast.error(`${error.response.data.message}`);
      }
    }
  };

  return (
    <DarkLightBlock className={cn('p-4', className)}>
      <form className={'flex flex-col gap-y-2'} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-x-3">
          <Avatar
            src={avatar ? getAbsoluteUrl(avatar) : ''}
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
            <SelectImage id="postImage" name="postImage" onChange={onChangeFile} multiple />
            {tagsIsOpen && <MultipleSelectorCreatable value={tags} setValue={setTags} />}
          </div>
        </div>
        <Line />
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

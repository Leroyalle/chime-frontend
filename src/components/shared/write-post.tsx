import React from 'react';
import { cn } from '@/lib/utils';
import { Button, Textarea } from '@nextui-org/react';
import { X } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { hasErrorField } from '@/lib';
import { useCreatePost } from '@/lib/hooks';

interface Props {
  className?: string;
}

export const WritePost: React.FC<Props> = ({ className }) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const { createPost, isPending } = useCreatePost();

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
      createPost({ postData: formData });
      setSelectedFile(null);
      setValue('post', '');
    } catch (error) {
      if (hasErrorField(error)) {
        console.error(error.data.error);
      }
    }
  };

  return (
    <form className={cn('flex flex-col gap-y-2', className)} onSubmit={handleSubmit(onSubmit)}>
      {selectedFile && (
        <div className="w-full h-96 relative select-none">
          <img
            className="object-cover w-full h-full"
            src={URL.createObjectURL(selectedFile)}
            alt={selectedFile.name}
          />
          <X className="absolute top-2 right-2 text-danger" onClick={() => setSelectedFile(null)} />
        </div>
      )}
      <Controller
        control={control}
        name="post"
        rules={{
          required: 'Обязательное поле',
        }}
        render={({ field }) => <Textarea placeholder="Что нового?" {...field} />}
      />
      <input
        id="postImage"
        type="file"
        name="postImage"
        className="hidden"
        onChange={onChangeFile}
        accept=".png, .jpg, .jpeg"
      />
      <Button className="w-full" disabled={isPending}>
        <label className="grid place-items-center w-full h-full" htmlFor="postImage">
          Добавить фото
        </label>
      </Button>
      <Button variant="solid" color="warning" type="submit" isLoading={isPending}>
        Отправить
      </Button>
    </form>
  );
};

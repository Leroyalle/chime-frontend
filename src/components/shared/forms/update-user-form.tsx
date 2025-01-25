import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';
import { useUpdateProfile } from '@/lib/hooks';
import { Avatar } from '@/components/ui';
import { SelectImage } from '../select-image';
import { getAbsoluteUrl } from '@/lib/utils';

interface Props {
  id: string;
  name: string;
  email: string;
  about: string;
  avatar: string;
  className?: string;
}

type TUpdateProfile = {
  name: string;
  email: string;
  about: string;
  avatar: string;
};
export const UpdateUserForm: React.FC<Props> = ({ id, name, email, about, avatar, className }) => {
  const { updateProfile, isPending: isPendingUpdate } = useUpdateProfile(id);
  const [selectedFile, setSelectedFile] = useState<File>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TUpdateProfile>({
    mode: 'onSubmit',
    defaultValues: {
      name,
      email,
      about: about ?? '',
      avatar: avatar,
    },
  });

  const onSubmit = (data: TUpdateProfile) => {
    const formdata = new FormData();
    formdata.append('name', data.name);
    formdata.append('about', data.about ?? '');
    if (selectedFile) formdata.append('avatar', selectedFile);
    updateProfile(formdata);
    setValue('name', data.name);
    setValue('email', data.email);
    setValue('about', data.about);
    setValue('avatar', data.avatar);
  };

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const avatar = event.target.files?.[0];
    setSelectedFile(avatar);
  };

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-3 mb-3">
        <div>
          <label htmlFor="avatar">
            <Avatar
              src={selectedFile ? URL.createObjectURL(selectedFile) : getAbsoluteUrl(avatar)}
            />
          </label>
          <SelectImage id="avatar" name="avatar" onChange={onChangeFile} multiple />
        </div>
        <Controller
          control={control}
          name="name"
          rules={{
            required: 'Обязательное поле',
            minLength: {
              value: 2,
              message: 'Не менее 2 символов',
            },
            maxLength: {
              value: 20,
              message: 'Не более 20 символов',
            },
          }}
          render={({ field }) => (
            <Input
              color="primary"
              label="Имя"
              errorMessage={errors.name?.message}
              isInvalid={!!errors.name}
              labelPlacement="outside"
              variant="bordered"
              placeholder="Имя"
              classNames={{
                label: 'text-foreground',
              }}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          rules={{ required: 'Обязательное поле' }}
          render={({ field }) => (
            <Input
              color="primary"
              labelPlacement="outside"
              variant="bordered"
              errorMessage={errors.email?.message}
              isInvalid={!!errors.email}
              label="Email"
              placeholder="Email"
              classNames={{
                label: 'text-foreground',
              }}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="about"
          rules={{ maxLength: { value: 30, message: 'Не более 100 символов' } }}
          render={({ field }) => (
            <Input
              color="primary"
              labelPlacement="outside"
              variant="bordered"
              errorMessage={errors.about?.message}
              isInvalid={!!errors.about}
              label="About"
              placeholder="About"
              classNames={{
                label: 'text-foreground',
              }}
              {...field}
            />
          )}
        />
      </div>
      <Button type="submit" color="warning" isLoading={isPendingUpdate}>
        Обновить
      </Button>
    </form>
  );
};

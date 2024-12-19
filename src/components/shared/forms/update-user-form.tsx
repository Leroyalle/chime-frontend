import React from 'react';
import { Button, Input } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';
import { useUpdateProfile } from '@/lib/hooks';

interface Props {
  id: string;
  name: string;
  email: string;
  about: string;
  className?: string;
}

type TUpdateProfile = {
  name: string;
  email: string;
  about: string;
};
export const UpdateUserForm: React.FC<Props> = ({ id, name, email, about, className }) => {
  const { updateProfile, isPending: isPendingUpdate } = useUpdateProfile(id);

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
    },
  });

  const onSubmit = (data: TUpdateProfile) => {
    const formdata = new FormData();
    formdata.append('name', data.name);
    formdata.append('about', data.about ?? '');
    // if (data.email) formdata.append('email', data.email);
    updateProfile(formdata);
    setValue('name', data.name);
    setValue('email', data.email);
    setValue('about', data.about);
  };

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-3 mb-3">
        <Controller
          control={control}
          name="name"
          rules={{
            required: 'Обязательное поле',
            minLength: {
              value: 2,
              message: 'Не менее 2 символов',
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

import React from 'react';
import { cn } from '@/lib/utils';
import { Button, Input } from '@nextui-org/react';
import { Lock, Mail, Notebook } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { hasErrorField } from '@/lib';
import { Api } from '@/services/api-client';
import { TRegister } from '../../../../../@types/auth';

interface Props {
  onChangeTab: () => void;
  className?: string;
}

export const RegisterForm: React.FC<Props> = ({ className, onChangeTab }) => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: TRegister) => {
    try {
      await Api.users.register(data);
      onChangeTab();
      setValue('name', '');
      setValue('email', '');
      setValue('password', '');
    } catch (error) {
      if (hasErrorField(error)) {
        console.error(error.data.error);
      }
    }
  };

  return (
    <form className={cn('flex flex-col gap-y-2', className)} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <Input endContent={<Notebook />} label="Name" placeholder="Nikolay Melonov" {...field} />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input endContent={<Mail />} label="Email" placeholder="chime@example.com" {...field} />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <Input endContent={<Lock />} label="Password" placeholder="password" {...field} />
        )}
      />
      <Button type="submit" color="warning">
        Зарегистрироваться
      </Button>
    </form>
  );
};

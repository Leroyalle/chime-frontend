'use client';
import React from 'react';
import { cn, saveAuthCookies } from '@/lib/utils';
import { Button, Input } from '@nextui-org/react';
import { Mail, Lock } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { TRegister } from '../../../../types/auth';
import { useRouter } from 'nextjs-toploader/app';
import { Api } from '@/services/api-client';
import { toast } from 'sonner';

interface Props {
  className?: string;
}

export const LoginForm: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const { control, handleSubmit, setValue } = useForm<Omit<TRegister, 'name'>>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: Omit<TRegister, 'name'>) => {
    const promise = Api.users.login(data);
    toast.promise(promise, {
      loading: 'Проверяю данные..',
      success: (res) => {
        saveAuthCookies(res.token);
        router.push('/');
        setValue('email', '');
        setValue('password', '');
        return 'Успешный вход в аккаунт!';
      },
      error: 'Что-то пошло не так! Попробуйте еще раз',
    });
  };
  return (
    <form className={cn('flex flex-col gap-y-2', className)} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="email"
        rules={{ required: 'Email обязателен' }}
        render={({ field }) => (
          <Input
            endContent={<Mail />}
            label="Email"
            variant="faded"
            autoComplete="off"
            type="email"
            placeholder="chime@example.com"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{ required: 'Password обязателен' }}
        render={({ field }) => (
          <Input
            endContent={<Lock />}
            label="Password"
            type="password"
            variant="faded"
            placeholder="password"
            {...field}
          />
        )}
      />

      <Button type="submit" color="warning">
        Войти
      </Button>
    </form>
  );
};

'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { Button, Input } from '@nextui-org/react';
import { Mail, Lock } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { Api } from '@/services/api-client';
import { hasErrorField } from '@/lib';
import { TRegister } from '../../../../../@types/auth';
import { saveAuthCookies } from '@/lib/save-auth-cookies';
import { useRouter } from 'nextjs-toploader/app';

interface Props {
  className?: string;
}

export const LoginForm: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: Omit<TRegister, 'name'>) => {
    try {
      const tokens = await Api.users.login(data);
      saveAuthCookies(tokens);
      router.push('/');
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
        name="email"
        rules={{ required: 'Email обязателен' }}
        render={({ field }) => (
          <Input endContent={<Mail />} label="Email" placeholder="chime@example.com" {...field} />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{ required: 'Password обязателен' }}
        render={({ field }) => (
          <Input endContent={<Lock />} label="Password" placeholder="password" {...field} />
        )}
      />
      <Button type="submit" color="warning">
        Войти
      </Button>
    </form>
  );
};

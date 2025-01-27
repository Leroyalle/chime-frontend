import React from 'react';
import { cn } from '@/lib/utils';
import { Button, Input } from '@nextui-org/react';
import { Mail, Lock, Notebook } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { Api } from '@/services/api-client';
import { TRegister } from '@/types';
import { toast } from 'sonner';

interface Props {
  onSuccess: (userId: string) => void;
  onChangeAction: VoidFunction;
  className?: string;
}

export const RegisterForm: React.FC<Props> = ({ className, onSuccess, onChangeAction }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TRegister>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: TRegister) => {
    const promise = Api.users.register(data);
    toast.promise(promise, {
      loading: 'Подождите, идет отправка кода на почту...',
      success: (res) => {
        onSuccess(res.userId);
        onChangeAction();
        setValue('email', '');
        return 'Письмо отправлено! Проверьте указанную почту';
      },
      error: 'Что-то пошло не так! Попробуйте еще раз',
    });
  };

  return (
    <form className={cn('flex flex-col gap-y-2', className)} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <Input
            endContent={<Notebook />}
            label="Имя"
            variant="faded"
            autoComplete="off"
            placeholder="Nikolay"
            {...field}
          />
        )}
        rules={{
          required: 'Имя обязательно',
          minLength: {
            value: 2,
            message: 'Введите корректное имя',
          },
          maxLength: {
            value: 10,
            message: 'Введите корректное имя',
          },
        }}
      />
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            endContent={<Mail />}
            label="Email"
            autoComplete="off"
            variant="faded"
            type="email"
            placeholder="chime@example.com"
            {...field}
          />
        )}
        rules={{
          required: 'Email обязателен',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Введите корректный email',
          },
        }}
      />
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <Input
            type="password"
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            endContent={<Lock />}
            label="Пароль"
            variant="faded"
            placeholder="password"
            {...field}
          />
        )}
        rules={{
          required: 'Пароль обязателен',
          minLength: {
            value: 6,
            message: 'Пароль должен быть не менее 6 символов',
          },
          maxLength: {
            value: 15,
            message: 'Пароль должен быть не более 15 символов',
          },
        }}
      />
      <Button type="submit" color="warning">
        Зарегистрироваться
      </Button>
    </form>
  );
};

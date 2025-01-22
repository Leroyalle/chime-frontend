import React from 'react';
import { cn } from '@/lib/utils';
import { Button, Input } from '@nextui-org/react';
import { Mail } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { Api } from '@/services/api-client';
import { TRegister } from '../../../../types/auth';
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

  const onSubmit = (data: { email: string }) => {
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
      {/* <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <Input endContent={<Notebook />} label="Name" placeholder="Nikolay Melonov" {...field} />
        )}
      /> */}
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            endContent={<Mail />}
            label="Email"
            placeholder="chime@example.com"
            {...field}
          />
        )}
        // rules={{ required: 'Email обязателен' }}
        rules={{
          required: 'Email обязателен',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Введите корректный email',
          },
        }}
      />
      <Button type="submit" color="warning">
        Зарегистрироваться
      </Button>
    </form>
  );
};

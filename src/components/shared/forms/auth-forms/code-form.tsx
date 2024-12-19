'use client';
import { InputOtp } from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@nextui-org/react';
import { hasErrorField } from '@/lib';
import { Api } from '@/services/api-client';
import { saveAuthCookies } from '@/lib/save-auth-cookies';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
interface Props {
  title?: string;
  userId: string;
  onChangeTab?: VoidFunction;
}

export const CodeForm: React.FC<Props> = ({ title, userId, onChangeTab }) => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = async (data: { code: string }) => {
    const res = Api.users.verifyCode({ userId, code: data.code });
    toast
      .promise(res, {
        pending: 'Подождите, идет регистрация...',
        success: 'Успешная регистрация, удачи!',
        error: 'Что-то пошло не так! Попробуйте отправить еще раз',
      })
      .then((res) => {
        saveAuthCookies(res.token);
        // FIXME: временно /
        router.push('/');
        if (onChangeTab) onChangeTab();
      })
      .catch((error) => {
        if (hasErrorField(error)) {
          console.error(error.data.message);
        }
      });
  };

  return (
    <form className="flex flex-col gap-4 w-full max-w-[300px]" onSubmit={handleSubmit(onSubmit)}>
      {title && <h3 className="text-3xl">{title}</h3>}
      <Controller
        control={control}
        name="code"
        render={({ field }) => (
          <InputOtp
            {...field}
            errorMessage={errors.code && errors.code.message}
            isInvalid={!!errors.code}
            length={6}
            type="number"
            description="Enter your code"
            value={field.value}
            onValueChange={field.onChange}
          />
        )}
        rules={{
          required: 'Code is required',
          minLength: {
            value: 6,
            message: 'Please enter a valid code',
          },
          pattern: {
            value: /^\d+$/,
            message: 'Please enter a valid number',
          },
        }}
      />
      <Button className="max-w-fit" type="submit" variant="flat">
        Отправить
      </Button>
    </form>
  );
};

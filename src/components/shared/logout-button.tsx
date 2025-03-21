'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@nextui-org/react';
import Cookies from 'js-cookie';
import { TokensEnum } from '@/types';
import { useRouter } from 'next/navigation';

interface Props {
  className?: string;
}

export const LogoutButton: React.FC<Props> = ({ className }) => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove(TokensEnum.JWT);
    router.push('/auth');
  };

  return (
    <Button
      color="danger"
      variant="flat"
      className={cn('text-xs', className)}
      onPress={handleLogout}>
      Выйти
    </Button>
  );
};

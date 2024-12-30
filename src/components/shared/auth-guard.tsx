import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@nextui-org/react';
import { useGetMe } from '@/lib/hooks';

interface Props {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const { data, isPending, isError } = useGetMe();

  useEffect(() => {
    if (isError) {
      router.push('/auth');
    }
  }, [isError, data, router]);

  if (isPending) {
    return (
      <Spinner
        color="warning"
        className="absolute bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    );
  }

  return children;
};

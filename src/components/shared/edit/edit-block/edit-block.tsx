import React from 'react';
import { cn } from '@/lib/utils';
import { DarkLightBlock } from '../../../ui';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { UpdateUserForm } from '../../forms';

interface Props {
  id: string;
  name: string;
  email: string;
  about: string;
  className?: string;
}

export const EditBlock: React.FC<Props> = ({ id, name, email, about, className }) => {
  const router = useRouter();

  return (
    <DarkLightBlock className={cn('p-4', className)}>
      <div className="flex gap-x-2 mb-4">
        <ArrowLeft onClick={() => router.back()} /> Блог
      </div>
      <UpdateUserForm id={id} name={name} email={email} about={about} />
    </DarkLightBlock>
  );
};

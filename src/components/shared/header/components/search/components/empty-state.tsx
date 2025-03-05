import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const EmptyState: React.FC<Props> = ({ className }) => (
  <div className={cn('flex flex-col items-center gap-y-2 p-2', className)}>
    <p>Пользователи с таким именем не найдены</p>
    <img src="/errors/not-found.png" className="w-72" alt="Ничего не найдено" />
  </div>
);

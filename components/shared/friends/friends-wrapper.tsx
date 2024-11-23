import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const FriendsWrapper: React.FC<Props> = ({ className }) => {
  return <section className={cn('', className)}></section>;
};

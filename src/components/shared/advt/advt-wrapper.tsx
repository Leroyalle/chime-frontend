import React from 'react';
import { DarkLightBlock } from '../../ui';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const AdvtWrapper: React.FC<Props> = ({ className }) => {
  return (
    <DarkLightBlock className={cn('bg-background', className)}>
      <aside>Реклама</aside>
    </DarkLightBlock>
  );
};

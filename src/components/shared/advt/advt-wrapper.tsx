import React from 'react';
import { DarkLightBlock } from '../../ui';

interface Props {
  className?: string;
}

export const AdvtWrapper: React.FC<Props> = ({ className }) => {
  return <DarkLightBlock className={className}>Реклама</DarkLightBlock>;
};

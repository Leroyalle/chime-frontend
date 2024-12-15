'use client';
import React from 'react';
import { Avatar as NextUIAvatar, AvatarProps } from '@nextui-org/react';

interface Props extends AvatarProps {
  className?: string;
}

export const Avatar: React.FC<Props> = ({ className, ...props }) => {
  return <NextUIAvatar className={className} {...props}  />;
};

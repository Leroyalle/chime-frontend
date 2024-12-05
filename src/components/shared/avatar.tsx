'use client';
import React from 'react';
import { Avatar as NextUIAvatar, AvatarProps } from '@nextui-org/react';

interface Props extends AvatarProps {
  className?: string;
}

export const Avatar: React.FC<Props> = ({ ...props }) => {
  return (
    <NextUIAvatar
      isBordered
      size="lg"
      className="w-20 h-20 text-large"
      src="https://avatars.githubusercontent.com/u/158848927?v=4"
      {...props}
    />
  );
};

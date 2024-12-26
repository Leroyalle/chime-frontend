import React from 'react';
import { Input } from '@nextui-org/react';
import { Search } from 'lucide-react';

interface Props {
  className?: string;
}

export const SearchChat: React.FC<Props> = ({ className }) => {
  return (
    <Input
      className={className}
      fullWidth
      startContent={<Search size={20} />}
      placeholder="Поиск..."
      type="text"
    />
  );
};

import React, { useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@nextui-org/react';
import { Loader } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
  className?: string;
}

export const SearchChats: React.FC<Props> = ({ value, onChange, isLoading, className }) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, []);

  return (
    <form className={cn('w-full', className)}>
      <Input
        value={value}
        onChange={handleChange}
        onClear={() => onChange('')}
        variant="bordered"
        autoComplete="off"
        isClearable
        placeholder="Поиск..."
        endContent={isLoading && <Loader className="size-4 animate-spin" />}
      />
    </form>
  );
};

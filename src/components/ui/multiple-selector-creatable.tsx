import React from 'react';
import MultipleSelector, { Option } from './shadcn-expendsions';
import { cn } from '@/lib/utils';

interface Props {
  value: Option[];
  setValue: (value: Option[]) => void;
  className?: string;
}

export const MultipleSelectorCreatable = ({ value, setValue, className }: Props) => {
  return (
    <div className={cn('w-full', className)}>
      <MultipleSelector
        value={value}
        onChange={setValue}
        placeholder="Добавьте хештег"
        hidePlaceholderWhenSelected
        inputProps={{ maxLength: 25 }}
        maxSelected={4}
        creatable
        className="bg-primary-light rounded-md"
        badgeClassName="bg-foreground transition text-blue-500 font-bold hover:bg-foreground hover:opacity-80"
      />
    </div>
  );
};

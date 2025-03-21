import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface Props {
  title: string;
  text: string;
  onClose: VoidFunction;
  className?: string;
}

export const EditableMessage: React.FC<Props> = ({ title, text, onClose, className }) => {
  return (
    <div className={cn('py-2 flex justify-between items-center', className)}>
      <div
        className={cn(
          'relative flex flex-col pl-4',
          'before:absolute before:bottom-0 before:-left-0 before:h-full before:w-1 before:bg-blue-500',
        )}>
        <span className="text-blue-500 font-bold select-none">{title}</span>
        <p>{text}</p>
      </div>
      <button type="button" onClick={onClose}>
        <X />
      </button>
    </div>
  );
};

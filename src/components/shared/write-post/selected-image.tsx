import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  selectedFile: File | null;
  onDelete: (file: File | null) => void;
  className?: string;
}

export const SelectedImage: React.FC<Props> = ({ selectedFile, onDelete, className }) => {
  if (!selectedFile) {
    return null;
  }

  return (
    <div className={cn('w-36 h-36 relative select-none', className)}>
      <img
        className="object-cover w-full h-full rounded-md"
        src={URL.createObjectURL(selectedFile)}
        alt={selectedFile?.name}
      />
      <X className="absolute top-2 right-2 text-danger" onClick={() => onDelete(null)} />
    </div>
  );
};

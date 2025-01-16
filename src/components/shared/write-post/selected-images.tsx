import React, { Dispatch } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface Props {
  selectedFiles: File[] | null;
  onDelete: Dispatch<React.SetStateAction<File[]>>;
  className?: string;
}

export const SelectedImages: React.FC<Props> = ({ selectedFiles, onDelete, className }) => {
  if (!selectedFiles) {
    return null;
  }

  return (
    <div className="px-12 grid [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] gap-2">
      {selectedFiles.map((file, i) => (
        <div
          key={i}
          className={cn(
            'w-full max-w-[200px] aspect-[1/1] h-full relative select-none',
            className,
          )}>
          <img
            className="object-cover w-full h-full rounded-md"
            src={URL.createObjectURL(file)}
            alt={file?.name}
          />
          <button onClick={() => onDelete(selectedFiles.filter((f) => f !== file))}>
            <X className="absolute top-2 right-2 text-danger" />
          </button>
        </div>
      ))}
    </div>
  );
};

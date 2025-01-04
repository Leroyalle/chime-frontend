'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC, ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  href: string;
  mark?: boolean;
  children: ReactNode;
}

export const SidebarItem: FC<Props> = ({ icon, href, children, mark }) => {
  const pathName = usePathname();
  const isPathMatch = new RegExp(`^${href}(?:\\/\\d+)?$`).test(pathName);
  return (
    <Link
      className={cn(
        `flex gap-x-2 relative transition-all w-full items-center rounded-md p-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground`,
        isPathMatch && 'bg-white',
        mark &&
          'after:absolute after:right-3 after:top-1/2 after:rounded-full after:-translate-y-1/2 after:rotate-45 after:text-red-500 after:font-black after:size-2 after:bg-yellow-500',
      )}
      href={href}>
      {icon} {children}
    </Link>
  );
};

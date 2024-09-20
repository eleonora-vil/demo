import { cn } from '@/utils';
import React from 'react';

interface ITypography {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'blockquote';
  children: React.ReactNode;
}

export default function Typography({ type = 'p', children, className, ...props }: ITypography & React.HTMLAttributes<HTMLElement>) {
  switch (type) {
    case 'h1':
      return (
        <h1 className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)} {...props}>
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2 className={cn('scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0', className)} {...props}>
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3 className={cn('mt-8 scroll-m-20 text-2xl font-semibold tracking-tight', className)} {...props}>
          {children}
        </h3>
      );
    case 'h4':
      return (
        <h4 className={cn('mt-8 scroll-m-20 text-xl font-semibold tracking-tight', className)} {...props}>
          {children}
        </h4>
      );
    case 'p':
      return (
        <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...props}>
          {children}
        </p>
      );
    case 'blockquote':
      return (
        <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)} {...props}>
          {children}
        </blockquote>
      );
    default:
      return (
        <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...props}>
          {children}
        </p>
      );
  }
}

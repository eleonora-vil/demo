import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@/utils';

interface ProgressProps {
  backgroundColor?: string;
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & ProgressProps>(
  ({ className, value, backgroundColor, ...props }, ref) => (
    <ProgressPrimitive.Root ref={ref} className={cn('relative h-4 w-full overflow-hidden rounded-full bg-gray-300', className)} {...props}>
      <ProgressPrimitive.Indicator
        className={cn(
          'h-full w-full flex-1 transition-all rounded-full flex justify-end items-center',
          backgroundColor || 'bg-primary', // Apply provided background color or default to "bg-primary"
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      >
        <div className="h-3 w-3 bg-tertiary rounded-full mr-[2.5px]"></div>
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  ),
);

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

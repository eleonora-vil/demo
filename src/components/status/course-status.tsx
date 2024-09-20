import { useState } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/utils';

interface CourseStatusProps {
  status: 'offline' | 'online';
}

export default function CourseStatusButton({ status }: CourseStatusProps) {
  const [statusState, setStatusState] = useState<'offline' | 'online'>(status);

  return (
    <div
      className={`relative m-0 w-[60px] block h-[22px] rounded-full text-white cursor-pointer ${statusState === 'online' ? 'bg-orange-500' : 'bg-primary'}`}
      onClick={() => {
        if (typeof setStatusState === 'function') {
          setStatusState(statusState === 'online' ? 'offline' : 'online');
        }
      }}
    >
      <Button className="relative top-0 m-0 h-full w-full cursor-pointer opacity-0" />
      <span
        className={`absolute top-1/2 left-1 flex -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-shade-1-100% dark:bg-primary shadow-sm duration-75 ease-linear ${
          statusState === 'online' && '!left-1'
        }`}
      >
        <span className={cn(statusState === 'online' ? 'hidden' : 'flex', 'gap-1 items-center')}>
          <span className="text-footnote">{statusState.slice(0, 1).toUpperCase() + statusState.slice(1)}</span>
          <span className={cn('w-4 h-4 bg-orange rounded-full')} />
        </span>
        <span className={cn(statusState !== 'online' ? 'hidden' : 'flex', 'gap-1 items-center')}>
          <span className="w-4 h-4 bg-primary rounded-full" />
          <span className="text-footnote">{statusState.slice(0, 1).toUpperCase() + statusState.slice(1)}</span>
        </span>
      </span>
    </div>
  );
}

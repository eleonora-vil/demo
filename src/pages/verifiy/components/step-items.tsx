import { X } from 'lucide-react';
import { CheckCheck } from 'lucide-react';
import { cn } from '@/utils';

interface StepItemsProps {
  step: number;
  isCompleted: 'completed' | 'uncompleted' | 'failed';
}

export default function StepItems({ step, isCompleted }: StepItemsProps) {
  return (
    <div className="flex items-center gap-2 justify-center ">
      <div
        className={cn(`flex items-center justify-center rounded-full size-12 
                ${isCompleted === 'completed' && 'bg-green-200 text-green-500'} ${isCompleted === 'failed' && 'bg-red-200 text-red-500'} ${
                  isCompleted === 'uncompleted' && 'bg-gray-200 text-gray-500-'
                }`)}
      >
        {isCompleted === 'completed' ? <CheckCheck size={24} /> : <X size={24} />}
      </div>
      <div>Step {step}</div>
    </div>
  );
}

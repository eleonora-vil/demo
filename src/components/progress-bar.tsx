import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';

interface Props {
  step: number;
}

export default function Progressbar({ step }: Props) {
  const [progressValue, setProgressValue] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('bg-gray-200');
  useEffect(() => {
    if (step === 1) {
      setProgressValue(14);
      setBackgroundColor('bg-primary');
    } else if (step === 2) {
      setProgressValue(40);
      setBackgroundColor('bg-sky-800');
    } else if (step === 3) {
      setProgressValue(65);
      setBackgroundColor('bg-orange');
    } else if (step === 4) {
      setProgressValue(100);
      setBackgroundColor('bg-green');
    }
  }, [step]);

  return (
    <div>
      <Progress value={progressValue} backgroundColor={backgroundColor} />
      <div className="flex justify-around items-center py-2">
        <div>General</div>
        <div>Outline</div>
        <div>Other</div>
        <div>Done</div>
      </div>
    </div>
  );
}

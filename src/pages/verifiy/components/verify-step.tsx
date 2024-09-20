import StepItems from './step-items';
import { useAppSelector } from '@/hooks/useRedux';

export default function VerifyStep() {
  const verifyStep = useAppSelector((state) => state.verifyStep);
  return (
    <div className="w-full mb-4">
      <div className="flex gap-2 justify-between items-center relative">
        {verifyStep.map((item, index) => (
          <div key={index}>
            <StepItems step={item.step} isCompleted={item.isCompleted} />
            {index !== verifyStep.length - 1 && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary h-[2px] w-16 rounded-full"></div>}
          </div>
        ))}
      </div>
    </div>
  );
}

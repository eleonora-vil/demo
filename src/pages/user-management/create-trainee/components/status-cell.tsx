import { cn } from '@/utils';

interface Props {
  isValid: boolean;
  isExisted: boolean;
  isDuplicate: boolean;
}

export default function StatusCell({ isValid, isExisted, isDuplicate }: Props) {
  return (
    <div
      className={cn(
        `text-center px-6 bg-green-300 text-green-600  py-1 rounded-md ${isValid === false && 'bg-red-300 text-red-600'} ${isExisted === true && 'bg-purple-300 text-purple-600'} ${isDuplicate === true && 'bg-blue-300 text-blue-600'}`,
      )}
    >
      {isValid ? <div>{isExisted ? <div>Existed</div> : <div>{isDuplicate ? <div>Duplicate</div> : <div>Valid</div>}</div>}</div> : <div>Invalid</div>}
    </div>
  );
}

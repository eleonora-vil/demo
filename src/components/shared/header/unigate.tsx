import UnigateIcon from '@/assets/images/unigate.png';
import { useAppSelector } from '@/hooks/useRedux';
export default function Unigate() {
  return (
    <div className="flex gap-2 items-center bg-slate-700 text-white py-[8px] px-[15px] rounded-md">
      <img src={UnigateIcon} alt="Unigate Icon" className="w-[28px] h-[20px]" />
      <span className="text-[14px] font-normal">Group 2</span>
    </div>
  );
}

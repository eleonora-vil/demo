import NavigationIcons from '@/components/icons/navigation-icons';
import { cn } from '@/utils';
import { MenuIcon, XIcon } from 'lucide-react';

type IProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function MenuButton({ isOpen, onClick }: IProps) {
  return (
    <div className={'p-2 flex justify-start items-center cursor-pointer'} onClick={onClick}>
      {isOpen ? <MenuIcon className="text-white" /> : <XIcon className="text-white" />}
    </div>
  );
}

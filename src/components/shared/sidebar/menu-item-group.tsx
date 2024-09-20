import { MenuItem } from '@/types/menuItems';
import { cn } from '@/utils';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuItemToogle from './menu-item-toogle';
import { useAppSelector } from '@/hooks/useRedux';
import { CSSTransition } from 'react-transition-group';
import Typography from '@/components/Typography';
import { AccessTo } from '@/types/permission';

type IProps = {
  menuItem: MenuItem;
  accessTo?: AccessTo;
};

export default function MenuItemGroup({ menuItem }: IProps) {
  const { isOpen } = useAppSelector((state) => state.sidebar);
  const location = useLocation();

  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleClickLink = (link: string, children: any) => {
    if ((link && children == undefined) || (!isOpen && link)) {
      navigate(link);
    } else if (children) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div key={menuItem.label} className={location.pathname.toLowerCase().includes(menuItem.link.toLowerCase()) && menuItem.children != null ? 'bg-gray-500/10 rounded-md' : ''}>
      <div
        className={cn(
          'flex items-center gap-3 cursor-pointer py-2 px-2 rounded-md',
          (location.pathname === menuItem.link && menuItem.children == null) || (!isOpen && location.pathname === menuItem.link) ? 'text-primary-foreground' : '',
        )}
        onClick={() => handleClickLink(menuItem.link, menuItem.children)}
      >
        <div>{menuItem.icon}</div>
        <div className={cn(isOpen ? 'flex-1 flex justify-between' : 'hidden', 'gap-3')}>
          <CSSTransition in={isOpen} timeout={200} classNames={'fade'} unmountOnExit>
            <Typography type="p">{menuItem.label}</Typography>
          </CSSTransition>
          {menuItem.children && <MenuItemToogle isOpen={!isExpanded} />}
        </div>
      </div>
      {menuItem.children && isOpen && isExpanded && (
        <div className="mt-2 space-y-[5px]">
          {menuItem.children.map((child, index) => (
            <Link
              to={child.link}
              key={index}
              className={cn('flex items-center gap-3 p-[5px] pl-11 cursor-pointer rounded-md', location.pathname === child.link ? 'text-primary-foreground' : '')}
            >
              <Typography type="p">{child.label}</Typography>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

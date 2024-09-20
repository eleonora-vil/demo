import NavigationIcons from '@/components/icons/navigation-icons';
import { MenuItem } from '@/types/menuItems';
import MenuButton from './menu-collapse-button';
import MenuItemGroup from './menu-item-group';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { toggleSidebar } from '@/lib/redux/sidebarSlice';
import { useEffect, useState } from 'react';

const menuItems: MenuItem[] = [
  {
    icon: <NavigationIcons icon="home" />,
    label: 'Home',
    link: '/',
    accessto: 'home',
  },

  {
    icon: <NavigationIcons icon="book-open" />,
    label: 'Syllabus',
    link: '/syllabus',
    accessto: 'syllabus',
    children: [
      {
        label: 'View Syllabus',
        link: '/syllabus',
        accessto: 'syllabus',
      },
      {
        label: 'Create Syllabus',
        link: '/syllabus/create',
        accessto: 'syllabus',
      },
    ],
  },
  {
    icon: <NavigationIcons icon="biotech" />,
    label: 'Training program',
    link: '/training-program',
    accessto: 'training-program',
    children: [
      {
        label: 'View program',
        link: '/training-program',
        accessto: 'training-program',
      },
      {
        label: 'Create program',
        link: '/training-program/create',
        accessto: 'training-program',
      },
    ],
  },
  {
    icon: <NavigationIcons icon="school" />,
    label: 'Class',
    link: '/class',
    accessto: 'class',
    children: [
      {
        label: 'View class',
        link: '/class',
      },
      {
        label: 'Create class',
        link: '/class/create',
        accessto: 'class',
      },
    ],
  },
  {
    icon: <NavigationIcons icon="calendar-today" />,
    label: 'Training calendar',
    link: '/training-calendar',
    accessto: 'training-calendar',
  },
  {
    icon: <NavigationIcons icon="group" />,
    label: 'User management',
    link: '/user-management',
    accessto: 'user',
    children: [
      {
        label: 'User list',
        link: '/user-management',
        accessto: 'user',
      },
      {
        label: 'User permission',
        link: '/user-management/permission',
        accessto: 'user',
      },
    ],
  },
  {
    icon: <NavigationIcons icon="folder" />,
    label: 'Learning materials',
    link: '/learning-materials',
    accessto: 'material',
  },
  {
    icon: <NavigationIcons icon="settings" />,
    label: 'Settings',
    link: '/profile',
    accessto: 'settings',
    children: [
      {
        label: 'Profile',
        link: '/profile',
      },
    ],
  },
];

export default function Menu() {
  const { isOpen } = useAppSelector((state) => state.sidebar);
  const dispatch = useAppDispatch();
  const { permissions } = useAppSelector((state) => state.authorized);
  const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItem[]>([]);

  const handleFilterMenu = () => {
    setFilteredMenuItems([]);
    menuItems.map((menuItem) => {
      if (menuItem.accessto === 'home') {
        if (!permissions.home.isAccessDenied && permissions.home.isView) {
          setFilteredMenuItems((prev) => [...prev, menuItem]);
        }
      }
      if (menuItem.accessto === 'syllabus') {
        let mockMenuItem: MenuItem = menuItem;
        if (!permissions.syllabus.isAccessDenied && permissions.syllabus.isView) {
          if (!permissions.syllabus.isCreate) {
            mockMenuItem = { ...menuItem, children: menuItem.children?.filter((child) => child.label !== 'Create Syllabus') };
          }
          setFilteredMenuItems((prev) => [...prev, mockMenuItem]);
        }
      }
      if (menuItem.accessto === 'training-program') {
        if (!permissions.program.isAccessDenied && permissions.program.isView) {
          let mockMenuItem: MenuItem = menuItem;
          if (!permissions.program.isCreate) {
            mockMenuItem = { ...menuItem, children: menuItem.children?.filter((child) => child.label !== 'Create program') };
          }
          setFilteredMenuItems((prev) => [...prev, mockMenuItem]);
        }
      }
      if (menuItem.accessto === 'class') {
        if (!permissions.class.isAccessDenied && permissions.class.isView) {
          let mockMenuItem: MenuItem = menuItem;
          if (!permissions.class.isCreate) {
            mockMenuItem = { ...menuItem, children: menuItem.children?.filter((child) => child.label !== 'Create class') };
          }
          setFilteredMenuItems((prev) => [...prev, mockMenuItem]);
        }
      }
      if (menuItem.accessto === 'training-calendar') {
        if (!permissions.calendar.isAccessDenied && permissions.calendar.isView) {
          setFilteredMenuItems((prev) => [...prev, menuItem]);
        }
      }
      if (menuItem.accessto === 'user') {
        if (!permissions.user.isAccessDenied && permissions.user.isView) {
          let mockMenuItem: MenuItem = menuItem;
          if (!permissions.user.isModify) {
            mockMenuItem = { ...menuItem, children: menuItem.children?.filter((child) => child.label !== 'User permission') };
          }
          setFilteredMenuItems((prev) => [...prev, mockMenuItem]);
        }
      }
      if (menuItem.accessto === 'material') {
        if (!permissions.material.isAccessDenied && permissions.material.isView) {
          setFilteredMenuItems((prev) => [...prev, menuItem]);
        }
      }
      if (menuItem.accessto === 'settings') {
        if (!permissions.settings.isAccessDenied && permissions.settings.isView) {
          setFilteredMenuItems((prev) => [...prev, menuItem]);
        }
      }
    });
  };

  useEffect(() => {
    handleFilterMenu();
  }, [permissions]);

  return (
    <div
      className={` 
      ${
        isOpen ? ' sidebar' : 'sidebar-closed'
      } transition-all h-full bg-primary px-5 py-[30px] pt-4 space-y-4 delay-150 duration-300 overflow-y-scroll no-scrollbar z-30 text-white/50
      `}
    >
      <MenuButton isOpen={isOpen} onClick={() => dispatch(toggleSidebar())} />
      {filteredMenuItems.map((menuItem, index) => (
        <MenuItemGroup menuItem={menuItem} key={index} />
      ))}
    </div>
  );
}

import { MenuItem } from '@/types/menuItems';
import { useEffect, useState } from 'react';
import { useAppSelector } from './useRedux';
import { getPermissionByRole } from '@/lib/api/permissionTable';
import { AccessLevel, AccessTo, PermissionType } from '@/types/permission';

interface Props {
  menuItems?: MenuItem[];
}

export default function useSideBarRoleProtected({ menuItems }: Props) {
  const [newMenuItems, setNewMenuItems] = useState<MenuItem[]>([]);
  const currentUser = useAppSelector((state) => state.currentUser);
  const [permission, setPermission] = useState<PermissionType>();
  const isTableRender = useAppSelector((state) => state.isTableRender);

  const handleGetPermissionByRoleID = async () => {
    if (!currentUser.user.roleID) return;
    const { data } = await getPermissionByRole(currentUser.user.roleID);
    if (data?.success) {
      setPermission(data.result.permission);
    }
  };

  const handleCheckAccessLevel = (accessLevel: AccessLevel) => {
    if (permission) {
      switch (accessLevel) {
        case 'Access denied':
          return false;
        default:
          return true;
      }
    }
  };

  const handleCheckAccessTo = (accessTo: AccessTo) => {
    if (permission) {
      switch (accessTo) {
        case 'syllabus':
          return handleCheckAccessLevel(permission.syllabusAccess);
        case 'program':
          return handleCheckAccessLevel(permission.programAccess);
        case 'user':
          return handleCheckAccessLevel(permission.userAccess);
        case 'class':
          return handleCheckAccessLevel(permission.classAccess);
        case 'material':
          return handleCheckAccessLevel(permission.materialAccess);
        case 'home':
          return true;
        case 'calendar':
          return true;
        case 'settings':
          return true;
        default:
          return false;
      }
    }
  };

  const handleRewriteMenuItems = () => {
    if (menuItems && permission) {
      const updatedMenuItems = menuItems.filter((item:any) => {
        if (item?.accessTo) {
          return handleCheckAccessTo(item?.accessTo);
        }
      });
      setNewMenuItems(updatedMenuItems);
    }
  };

  useEffect(() => {
    handleGetPermissionByRoleID();
  }, [currentUser, isTableRender]);

  useEffect(() => {
    if (permission) handleRewriteMenuItems();
  }, [currentUser, permission]);

  return { newMenuItems };
}

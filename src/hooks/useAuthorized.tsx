import { AccessTo } from '@/lib/redux/authorizedSlice';
import { useAppSelector } from './useRedux';
import { useEffect, useState } from 'react';

interface Props {
  requestTo: AccessTo;
  actionType: 'view' | 'modify' | 'create';
}
export default function useAuthorized({ requestTo, actionType }: Props) {
  const [isValid, setIsValid] = useState<boolean>(false);
  const { isAuthorized, permissions } = useAppSelector((state) => state.authorized);

  useEffect(() => {
    switch (requestTo) {
      case 'home':
        setIsValid(permissions.home.isView || permissions.home.isFullAccess);
        break;
      case 'syllabus':
        if (actionType === 'view') {
          setIsValid(permissions.syllabus.isView || permissions.syllabus.isFullAccess);
        } else if (actionType === 'modify') {
          setIsValid(permissions.syllabus.isModify || permissions.syllabus.isFullAccess);
        } else if (actionType === 'create') {
          setIsValid(permissions.syllabus.isCreate || permissions.syllabus.isFullAccess);
        }
        break;
      case 'training-program':
        if (actionType === 'view') {
          setIsValid(permissions.program.isView || permissions.program.isFullAccess);
        }
        if (actionType === 'modify') {
          setIsValid(permissions.program.isModify || permissions.program.isFullAccess);
        }
        if (actionType === 'create') {
          setIsValid(permissions.program.isCreate || permissions.program.isFullAccess);
        }
        break;
      case 'class':
        if (actionType === 'view') {
          setIsValid(permissions.class.isView || permissions.class.isFullAccess);
        }
        if (actionType === 'modify') {
          setIsValid(permissions.class.isModify || permissions.class.isFullAccess);
        }
        if (actionType === 'create') {
          setIsValid(permissions.class.isCreate || permissions.class.isFullAccess);
        }
        break;
      case 'training-calendar':
        setIsValid(permissions.calendar.isView || permissions.calendar.isFullAccess);
        break;
      case 'user':
        if (actionType === 'view') {
          setIsValid(permissions.user.isView || permissions.user.isFullAccess);
        }
        if (actionType === 'modify') {
          setIsValid(permissions.user.isModify || permissions.user.isFullAccess);
        }
        if (actionType === 'create') {
          setIsValid(permissions.user.isCreate || permissions.user.isFullAccess);
        }
        break;
      case 'material':
        if (actionType === 'view') {
          setIsValid(permissions.material.isView || permissions.material.isFullAccess);
        }
        if (actionType === 'modify') {
          setIsValid(permissions.material.isModify || permissions.material.isFullAccess);
        }
        if (actionType === 'create') {
          setIsValid(permissions.material.isCreate || permissions.material.isFullAccess);
        }
        break;
      case 'settings':
        setIsValid(permissions.settings.isView || permissions.settings.isFullAccess);
        break;
    }
  }, [permissions, isAuthorized]);

  return isValid;
}

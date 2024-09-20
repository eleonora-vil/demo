import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';
import Loading from '@/components/loading';
import { getPermissions } from '@/lib/redux/authorizedSlice';
import { useLocation } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

export default function AuthorizedRoute({ children }: Props) {
  const { isAuthorized, trigger } = useAppSelector((state) => state.authorized);
  const user = useAppSelector((state) => state.currentUser.user);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    const handleGetPermissions = async () => {
      if (user?.roleID) {
        dispatch(getPermissions(user.roleID));
      }
    };
    handleGetPermissions();
  }, [location.pathname, user?.roleID, trigger]);

  return isAuthorized ? (
    <div>{children}</div>
  ) : (
    <div className="w-screen h-screen flex items-center justify-center">
      <Loading></Loading>
    </div>
  );
}

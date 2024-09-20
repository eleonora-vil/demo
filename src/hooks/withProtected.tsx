import Loading from '@/components/loading';
import { checkToken } from '@/lib/api/login';
import { login, updateUser } from '@/lib/redux/currentUserSlice';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from './useRedux';
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const authenticated = useAppSelector((store) => store.currentUser.authenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const init = async () => {
      checkToken().then((res) => {
        if (res?.error) {
          toast.error('Please login to continue');
          console.log('Please login to continue');
          navigate('/login');
          return;
        }

        if (res?.data) {
          dispatch(updateUser(res?.data?.result?.user));
          dispatch(login());
        }
      });
    };
    init();
  }, [location.pathname]);

  return authenticated ? (
    <div>{children}</div>
  ) : (
    <div className="w-screen h-screen flex items-center justify-center">
      <Loading></Loading>
    </div>
  );
}

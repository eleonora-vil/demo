import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './useRedux';
import { useEffect } from 'react';
import { checkToken } from '@/lib/api/login';
import { toast } from 'react-toastify';
import { login, updateUser } from '@/lib/redux/currentUserSlice';
import Loading from '@/components/loading';

export default function LoginProtectedRoute({ children }: { children: React.ReactNode }) {
  const authenticated = useAppSelector((store) => store.currentUser.authenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      checkToken().then((res) => {
        if (res?.error) {
          // toast.error("Please login to continue", {
          //   position: "top-left",
          // });
          dispatch(updateUser(res?.data?.result?.user));
          dispatch(login());
          return;
        }

        if (res?.data) {
          navigate('/');
        }
      });
    };
    init();
  }, []);

  return authenticated ? (
    <div>{children}</div>
  ) : (
    <div className="w-screen h-screen flex items-center justify-center">
      <Loading></Loading>
    </div>
  );
}

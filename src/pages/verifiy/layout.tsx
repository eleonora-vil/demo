import { useAppSelector } from '@/hooks/useRedux';
import VerifyStep from './components/verify-step';
import { Link, Outlet } from 'react-router-dom';
import VerifyEmail from './verify-email';
import VerifyUpdateInfo from './verify-update-info';
import VerifySuccess from './verify-success';

export default function OtpConfirmLayout() {
  const verifyStep = useAppSelector((state) => state.verifyStep);
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="p-6  w-[450px] space-y-6 ">
        <div>
          <div className="text-4xl font-bold w-full text-center">Welcome to FAMS</div>
        </div>
        <div>
          <div>
            <VerifyStep />
          </div>
          <div className="flex items-center justify-center">
            {verifyStep[0].isCompleted === 'uncompleted' ? <VerifyEmail /> : verifyStep[1].isCompleted === 'uncompleted' ? <VerifyUpdateInfo /> : <VerifySuccess />}
          </div>
          <div className="mt-2 text-center">
            Already have an account?{' '}
            <Link to={'/login'} className="text-blue-500">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

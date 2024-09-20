import { useAppSelector } from '@/hooks/useRedux';
import { Navigate } from 'react-router-dom';

interface ProtectedVerifyRouteProps {
  children: React.ReactNode;
}

export default function ProtectetdVerifyRoute({ children }: ProtectedVerifyRouteProps) {
  const verifyStep = useAppSelector((state) => state.verifyStep);

  if (verifyStep[0].isCompleted !== 'completed') {
    return <Navigate to="/verify" />;
  } else {
    return <>{children}</>;
  }
}

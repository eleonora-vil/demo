import { AccessTo } from '@/lib/redux/authorizedSlice';
import useAuthorized from './useAuthorized';
import AccesDeniedPage from '@/pages/access-denied';

interface Props {
  children: React.ReactNode;
  requestTo: AccessTo;
  actionType: 'view' | 'modify' | 'create';
}

export default function RoleAuthorizedProtectedRoute({ children, requestTo, actionType }: Props) {
  const isAccessable = useAuthorized({ requestTo, actionType });
  if (isAccessable) {
    return <>{children}</>;
  }
  return <AccesDeniedPage />;
}

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { logout } from '@/lib/redux/currentUserSlice';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllRoleApi } from '@/lib/api/role-api';

export default function UserNav() {
  const [roles, setRoles] = useState<any[]>([]);
  const user = useAppSelector((store) => store.currentUser.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    dispatch(logout());
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  useEffect(() => {
    getAllRoleApi()
      .then((res) => {
        setRoles(res?.data?.result?.roles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   document.title = roles?.find((role) => role?.roleId == user?.roleID)?.roleName || 'FAMS Dashboard';
  // }, [roles]);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center space-x-4 cursor-pointer">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user?.avatar ? user?.avatar : 'https://avatar.iran.liara.run/public/boy?username=FAMS'} alt="@fams" />
              <AvatarFallback>FA</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.userName} - {roles?.find((role) => role?.roleId == user?.roleID)?.roleName}
              </p>
              <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => navigate('profile')} className="cursor-pointer">
              Profile
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

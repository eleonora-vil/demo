import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAppSelector } from '@/hooks/useRedux';
import { checkToken } from '@/lib/api/login';
import { updateUser as updateUserRedux } from '@/lib/redux/currentUserSlice';
import { formatDate } from '@/utils/DateUtils';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';




export default function ProfileForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<any>({});
  const currentUser = useAppSelector((state) => state.currentUser.user);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await checkToken();
        setUserData(result.data?.result.user);
        dispatch(updateUserRedux(result.data?.result.user));
      } catch (error) {
        if (error instanceof TypeError) {
          console.error('Type error occurred:', error);
        }
      }
    };
    fetchData();
  }, []);
  if (!currentUser) return;
  console.log(currentUser);
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
        <div className="col-span-4 sm:col-span-3">
          <Card className="bg-white rounded-lg p-6">
            <div className="flex flex-col items-center">
              <img
                src={currentUser.avatar ? currentUser.avatar : 'https://avatar.iran.liara.run/public/boy?username=FAMS'}
                className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0 object-cover"
              />
              <h1 className="text-xl font-bold">FASM</h1>
              <p className="text-gray-700">Admin</p>
            </div>
          </Card>
        </div>
        <div className="col-span-4 sm:col-span-9">
          <Card className="bg-white rounded-lg p-6">
            <Link to="/profile/update">
              <Button className="text-xl font-bold mb-4 float-right">Update</Button>
            </Link>
            <h1 className="text-xl font-bold mb-10">General Information</h1>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold mb-4">User name</h2>
                <div>{currentUser?.userName}</div>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-4">Phone Number</h2>
                <div>{currentUser?.phoneNumber && currentUser?.phoneNumber.trim() !== '' ? currentUser?.phoneNumber : 'No article'}</div>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-4">Birthday</h2>
                <div>{currentUser?.birthDate ? formatDate(new Date(currentUser?.birthDate)) : 'No birthday'}</div>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-4">Full name</h2>
                <div>{currentUser?.fullName}</div>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-4">Email</h2>
                <div>{currentUser?.email}</div>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-4">Gender</h2>
                <div>{currentUser?.gender}</div>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-4">Address</h2>
                <div>{currentUser?.address && currentUser?.address.trim() !== '' ? currentUser?.address : 'No article'}</div>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-4">Level</h2>
                <div>{currentUser?.level}</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

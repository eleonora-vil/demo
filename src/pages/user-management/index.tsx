import FilterSearchBox from '@/components/filter';
import TitleBanner from '@/components/title-banner';
import { DataTable } from './components/data-table';
import CreateUserDialog from './components/dialog/create-user-dialog';
import UpdateUserDialog from './components/dialog/update-user-dialog';
import { useEffect } from 'react';
import { getAllRoleApi } from '@/lib/api/role-api';
import { set } from '@/lib/redux/roleSlice';
import { useDispatch } from 'react-redux';
import CreateTraineeDialog from './create-trainee/components/create-trainee-button';
import { Link } from 'react-router-dom';
import useAuthorized from '@/hooks/useAuthorized';

export default function UserManagementPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      getAllRoleApi()
        .then((res) => {
          dispatch(set(res?.data));
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, []);

  const isCreateAccessable = useAuthorized({ requestTo: 'user', actionType: 'create' });

  const titleActionOption = [
    <CreateTraineeDialog key="create-trainee-dialog" isAccessable={isCreateAccessable} />,
    <CreateUserDialog key="create-user-dialog" isAccessable={isCreateAccessable} />,
  ];
  useEffect(() => {
    document.title = 'User List - FAMS';
  }, []);
  return (
    <main className="space-y-2 pb-12 ">
      <TitleBanner title={'User Management'} component={titleActionOption} />
      <div className="flex justify-between gap-1 px-5">
        <UpdateUserDialog />
      </div>
      <DataTable />
    </main>
  );
}

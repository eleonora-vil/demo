'use client';

import ActionIcons from '@/components/icons/action-icons';
import DocumentManageIcons from '@/components/icons/document-manage-icons';
import OtherIcons from '@/components/icons/other-icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { changeRoleApi } from '@/lib/api/role-api';
import { changeStatus, deleteUser } from '@/lib/api/user-api';
import { updateReRenderFunction } from '@/lib/redux/dataTableSlice';
import { setIsUpdateFormOpen, updateUserForm } from '@/lib/redux/form/userFormSlice';
import { RoleType } from '@/types/role';
import { Row } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  // const user = userSchema.parse(row.original);
  const [status, setStatus] = useState(true);
  const userId: number = row.getValue('userId');
  
  const roles = useAppSelector((state) => state.role.value);
  const dispatch = useAppDispatch();
  const handleOpenEdit = () => {
    console.log(row);
    dispatch(
      updateUserForm({
        userId: row.getValue('userId'),
      }),
    );

    dispatch(setIsUpdateFormOpen(true));
  };

  useEffect(() => {
    const userStatus: string = row.getValue('status');
    if (userStatus.toLowerCase() === 'active') {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, []);

  //  const getStatusAccount=async()=>{

  //     const data=await getUserById(""+userId);
  //     if(data.error){
  //       toast.error(data.error,{
  //         position:"top-left"
  //       })
  //     }
  //     else{

  //       console.log(data.data.result.user.status);

  //       setStatus(data.data.result.user.status)
  //     }
  //  }

  //  useEffect(()=>{
  //   getStatusAccount()
  //   console.log("status",status);

  //  },[status])
  const state = useAppSelector((state) => state.userForm);

  const handleDelete = (id: number) => {
    deleteUser(id).then((res) => {
      if (res?.error) {
        toast.error('Failed to delete user. User might not exist or an error occurred');
        return;
      }
      if (res?.data) {
        toast.success('User successfully deleted!');
        dispatch(updateReRenderFunction());
        // update table
      }
    });
  };
  const handleChangeStatus = (id: number) => {
    const submitStatus = status ? 'InActive' : 'Active';

    changeStatus(id, submitStatus).then((res) => {
      if (res?.error) {
        toast.error(`Failed to delete user. User might not exFailed to change user status.`);
        return;
      }
      if (res?.data) {
        // toast.success("User status changed successfully");
        toast.success('Change status successfully! ');
      }
      setStatus(!status);
      dispatch(updateReRenderFunction());
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <ActionIcons icon="more-horizontal" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[250px]">
        <DropdownMenuItem className="gap-2" onClick={handleOpenEdit}>
          <DocumentManageIcons icon="create" />
          Edit user
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="gap-2">
            <OtherIcons icon="role" /> Change role
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={userId + ''}>
              {roles?.map((role: RoleType) => (
                <DropdownMenuRadioItem
                  key={role.roleId}
                  value={role.roleId + ''}
                  onClick={async () => {
                    const result = await changeRoleApi(userId, role.roleId);
                    if (result.error) {
                      toast.error(result?.error, {
                        position: 'top-left',
                      });
                    }
                    dispatch(updateReRenderFunction());
                    toast.success(
                      // "Change role of user " +
                      //   userId +
                      //   " to " +
                      //   role?.roleName +
                      //   " successfully!"
                      'Change role successfully! ',
                    );
                  }}
                >
                  {role.roleName}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem className="gap-2" onClick={() => handleChangeStatus(Number(userId))}>
          {status == false ? <ActionIcons icon="visibility" /> : <ActionIcons icon="visibility-off" />}
          {status == true ? 'Deactivate User' : 'Activate User'}
        </DropdownMenuItem>
        {/* <DropdownMenuItem
          className="gap-2"
          onClick={() => handleDelete(row.getValue("id"))}
        >
          <DocumentManageIcons icon="delete-forever" /> Delete user
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

'use client';

import ActionIcons from '@/components/icons/action-icons';
import DocumentManageIcons from '@/components/icons/document-manage-icons';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { changeStatus, deleteTrainingProgram } from '@/lib/api/training-program-api';

import { updateReRenderFunction } from '@/lib/redux/dataTableSlice';
import { Row } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  // const user = userSchema.parse(row.original);
  const user = useAppSelector((store) => store.currentUser.user);
  const [status, setStatus] = useState(true);
  const programId: number = row.getValue('programId');
  const navigator = useNavigate();
  // const userRoleId: string = row.getValue("roleID");
  // const roles = useAppSelector((state) => state.role.value);
  const dispatch = useAppDispatch();
  const handleOpenEdit = () => {
    console.log(row);
    const { programId }  = row.original as any ;
    navigator(`/training-program/${programId}/edit`);
    // dispatch(
    //   updateProgramForm({
    //     programId: row.getValue("programId")
    //   })
    // );
    // dispatch(setIsUpdateFormOpen(true));
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
    deleteTrainingProgram(id).then((res) => {
      if (res?.error) {
        toast.error('Failed to delete program. Program might not exist or an error occurred');
        return;
      }
      if (res?.data) {
        toast.success('Delete program successfully!');
        // toast.success("Traning Program successfully deleted");
        dispatch(updateReRenderFunction());
        // update table
      }
    });
  };
  const handleChangeStatus = (programId: number) => {
    const submitStatus = status ? 'InActive' : 'Active';
    console.log(user);
    
    changeStatus(programId, submitStatus,user.userName).then((res) => {
      if (res?.error) {
        toast.error(`Failed to program. User might not exFailed to change user status.`);
        return;
      }
      if (res?.data) {
        toast.success('Change status successfully!',{
          position:"top-left"
        });
        // toast.success("Program status changed successfully");
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
          Edit program
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2" onClick={() => handleChangeStatus(Number(programId))}>
          {status == false ? <ActionIcons icon="visibility" /> : <ActionIcons icon="visibility-off" />}
          {status == true ? 'Deactivate program' : 'Activate program'}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2"
          onClick={() => {
            handleDelete(row.getValue('programId'));
          }}
        >
          <DocumentManageIcons icon="delete-forever" /> Delete program
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

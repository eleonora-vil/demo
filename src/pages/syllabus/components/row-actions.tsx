'use client';

import ActionIcons from '@/components/icons/action-icons';
import DocumentManageIcons from '@/components/icons/document-manage-icons';
import NavigationIcons from '@/components/icons/navigation-icons';
import OtherIcons from '@/components/icons/other-icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useAuthorized from '@/hooks/useAuthorized';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { changeStatus, duplicateSyllabus } from '@/lib/api/syllabus-detail-api';

import { updateReRenderFunction } from '@/lib/redux/dataTableSlice';
import { StatusType } from '@/types/changeStatus';
import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  // const user = userSchema.parse(row.original);
  // const [status, setStatus] = useState(true);

  const syllabusId: number = row.getValue('syllabusId');
  const navigator = useNavigate();
  // const userRoleId: string = row.getValue("roleID");
  // const roles = useAppSelector((state) => state.role.value);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const userStatus: string = row.getValue("status");
  //   if (userStatus.toLowerCase() === "true") {
  //     setStatus(true);
  //   } else {
  //     setStatus(false);
  //   }
  // }, []);

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
  const navigate = useNavigate();
  const handleDuplicateSyllabus = (syllabusId: number) => {
    duplicateSyllabus(syllabusId)
      .then((res) => {
        if (res?.error) {
          console.error('Error duplicate syllabus:', res.error);
          toast.error('Failed to duplicate syllabus. Please try again later.');
        } else {
          toast.success('Syllabus duplicated successfully');
          console.log(res);
          navigate('/syllabus/' + res?.data?.result?.syllabusId || '');
        }
      })
      .finally(() => {});
  };
  // const handleChangeStatus = (syllabusId: number) => {
  //   let submitStatus = status ? "false" : "true";

  //   changeStatus(syllabusId, submitStatus).then((res) => {
  //     if (res?.error) {
  //       toast.error(
  //         `Failed to program. User might not exFailed to change user status.`
  //       );
  //       return;
  //     }
  //     if (res?.data) {
  //       toast.success("Syllabus status changed successfully");
  //     }
  //     setStatus(!status);
  //     dispatch(updateReRenderFunction());
  //   });
  // };
  const isAccessable = useAuthorized({ requestTo: 'syllabus', actionType: 'modify' });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Manage</DropdownMenuLabel>
        <Link to={`/syllabus/${row.getValue('syllabusId')}`}>
          <DropdownMenuItem className="cursor-pointer">View syllabus</DropdownMenuItem>
        </Link>

        {isAccessable && (
          <div>
            <DropdownMenuSeparator />
            <Link to={`/syllabus/${row.getValue('syllabusId')}/update`}>
              <DropdownMenuItem className="gap-2">
                <DocumentManageIcons icon="create" />
                Edit syllabus
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="gap-2" onSelect={() => handleDuplicateSyllabus(Number(row.getValue('syllabusId')))}>
              <DocumentManageIcons icon="copy" />
              Duplicate syllabus
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="gap-2">
                <OtherIcons icon="role" /> Change Status
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={row.getValue('status') + ''}>
                  <DropdownMenuRadioItem
                    key={'active'}
                    value={'active'}
                    onClick={async () => {
                      const result = await changeStatus(syllabusId, 'active');
                      if (result.error) {
                        toast.error(result?.error, {
                          position: 'top-left',
                        });
                      }
                      dispatch(updateReRenderFunction());
                      toast.success('Change status successfully! ');
                    }}
                  >
                    {'Active'}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    key={'inactive'}
                    value={'inactive'}
                    onClick={async () => {
                      const result = await changeStatus(syllabusId, 'inactive');
                      if (result.error) {
                        toast.error(result?.error, {
                          position: 'top-left',
                        });
                      }
                      dispatch(updateReRenderFunction());
                      toast.success('Change status successfully! ');
                    }}
                  >
                    {'Inactive'}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    key={'Draft'}
                    value={'Draft'}
                    onClick={async () => {
                      const result = await changeStatus(syllabusId, 'Draft');
                      if (result.error) {
                        toast.error(result?.error, {
                          position: 'top-left',
                        });
                      }
                      dispatch(updateReRenderFunction());
                      toast.success('Change status successfully! ');
                    }}
                  >
                    {'Draft'}
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </div>
        )}

        {/* <DropdownMenuItem
          className="gap-2"
          onClick={() => handleChangeStatus(Number(syllabusId))}
        >
          {status == false ? (
            <ActionIcons icon="visibility" />
          ) : (
            <ActionIcons icon="visibility-off" />
          )}
          {status == true ? "Deactivate syllabus" : "Activate syllabus"}
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

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
import { Row } from '@tanstack/react-table';
// import { classSchema } from '../data/class-schema';
import { changeStatus, deleteClass } from '@/lib/api/class-api';
import { toast } from 'react-toastify';
import { updateReRenderFunction } from '@/lib/redux/dataTableSlice';
import { useAppDispatch } from '@/hooks/useRedux';
import { Link } from 'react-router-dom';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const classId: number = row.getValue('classId');
  const dispatch = useAppDispatch();
  const handleDelete = (id: number) => {
    console.log(id);
    
    deleteClass(id).then((res) => {
      console.log(res);
      
      if (res?.error) {
        toast.error(
          res?.error.result.message
        );
        return;
      }
      if (res?.data) {
        toast.success("Class successfully deleted");
        dispatch(updateReRenderFunction())
        // update table
      }
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
        <Link to={`/class/${classId}/edit`}>
          <DropdownMenuItem className="gap-2">
            <DocumentManageIcons icon="create" />
            Edit class
          </DropdownMenuItem>
        </Link>

        {/* <DropdownMenuItem className="gap-2">
          <ActionIcons icon="visibility" /> De-active class
        </DropdownMenuItem> */}

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
                  const result = await changeStatus(classId, 'active');
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
                key={'deactive'}
                value={'deactive'}
                onClick={async () => {
                  const result = await changeStatus(classId, 'deactive');
                  if (result.error) {
                    toast.error(result?.error, {
                      position: 'top-left',
                    });
                  }
                  dispatch(updateReRenderFunction());
                  toast.success('Change status successfully! ');
                }}
              >
                {'Deactive'}
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem
          className="gap-2"
          onClick={() => {
            handleDelete(classId)
          }}
        >
          <DocumentManageIcons icon="delete-forever" /> Delete class
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

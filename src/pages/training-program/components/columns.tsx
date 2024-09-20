'use client';

import { ColumnDef } from '@tanstack/react-table';

import ActionIcons from '@/components/icons/action-icons';
import { Badge } from '@/components/ui/badge';
import useAuthorized from '@/hooks/useAuthorized';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { DataTableRowActions } from './row-actions';
import SortIconStatus from './sort-icon-status';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'programId',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Program Id
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => <div>{row.getValue('programId')}</div>,
  },

  {
    accessorKey: 'programName',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2 w-[150px]" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Program Name
          <ActionIcons icon="sort" />
        </div>
      );
    },
    cell: ({ row }) => {
      const navigator = useNavigate();
      return (
        <div className="font-bold cursor-pointer hover:underline break-all overflow-auto " onClick={() => navigator(`/training-program/${row.original.programId}`)}>
          {row.getValue('programName')}
        </div>
      );
    },
  },

  {
    accessorKey: 'startDate',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2 truncate" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Create On
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => <div className="truncate">{row.getValue('startDate') ? format(new Date(row.getValue('startDate')), 'dd/MM/yyyy') : 'Empty'}</div>,
    filterFn: (row, id, filterValue) => {
      return filterValue.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'createBy',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Create By
          <ActionIcons icon="sort" />
        </div>
      );
    },
    cell: ({ row }) => <div>{row.getValue('createBy')}</div>,

    filterFn: (row, id, filterValue) => {
      return filterValue.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'duration',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Duration
          <ActionIcons icon="sort" />
        </div>
      );
    },
    cell: ({ row }) => {
  return <div>{(((new Date(row.original?.endDate)).getTime())-((new Date(row.original?.startDate)).getTime()))/ 1000 / 3600 /4 } hours </div>},
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Status
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => {
      const status = (row.getValue('status') as string).toLowerCase() === 'active' ? true : false;
      return (
        <Badge className={`${status ? 'bg-green-200 text-green-500 hover:bg-green-200' : 'bg-red-200 hover:bg-red-200 text-red-500'}  capitalize`}>
          {status ? 'active' : 'inactive'}
        </Badge>
      );
    },
    filterFn: (row, id, filterValue) => {
      return filterValue.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const isAccessable = useAuthorized({ requestTo: 'training-program', actionType: 'modify' });
      return isAccessable && <DataTableRowActions row={row} />;
    },
  },
];
// {
//   id: "actions",
//   enableHiding: false,
//   cell: ({ row }) => {
//     const payment = row.original

//     const handleDelete = (id: string) => {
//       const isConfirmed = window.confirm("Are you sure you want to delete ???");

//       if (!isConfirmed) {
//         return;
//       }

//       deleteTrainingProgram(id)
//         .then((res) => {
//           if (res.error) {
//             // toast error
//             toast.error("Delete training program " + id + " failed: " + res.error);
//             return;
//           }

//           if (res.data) {
//             // toast success
//             toast.success("Delete training program " + id + " successfully");
//           }
//         });
//     };

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild >
//             <Button variant="ghost" className="h-8 w-8 p-0 text-blue-800  ">
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end" className="text-blue-800">
//             <DropdownMenuLabel className="text-indigo-900" >Manage</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem> <NavigationIcons icon="folder" className="mx-2 w-[24px] h-[24px] " />Training material</DropdownMenuItem>
//             <DropdownMenuItem>  <DocumentManageIcons icon="create" className="mx-2 w-[24px] h-[24px]" /> Edit program</DropdownMenuItem>
//             <DropdownMenuItem>  <DocumentManageIcons icon="copy" className="mx-2 w-[24px] h-[24px]" />Duplicate program</DropdownMenuItem>
//             <DropdownMenuItem> <ActionIcons icon="visibility-off" className="mx-2 w-[24px] h-[24px]" /> De-activate program</DropdownMenuItem>

//             <DropdownMenuItem onClick={() => handleDelete(row.original.id)} className="text-zinc-400">
//               <DocumentManageIcons icon="delete-forever" className="mx-2 w-[24px] h-[24px]" />Delete program
//             </DropdownMenuItem>

//           </DropdownMenuContent>
//         </DropdownMenu>
//       )
//     },
//   },
// ]

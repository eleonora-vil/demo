'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

import OtherIcons from '@/components/icons/other-icons';
import { Badge } from '@/components/ui/badge';
import { IUser } from '@/types/user';
import { DataTableRowActions } from './row-actions';
import SortIconStatus from './sort-icon-status';
import { format } from 'date-fns';
import useAuthorized from '@/hooks/useAuthorized';
import { NumberFormat } from 'xlsx';
const getRoleName = (roleId: NumberFormat): string => {
  switch (roleId) {
    case 1:
      return 'Super Admin';
    case 2:
      return 'Admin';
    case 3:
      return 'Instructor';
    case 4:
      return 'Trainee';
    default:
      return '';
  }
};
export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: 'userId',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Id
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => <div>{row.getValue('userId')}</div>,
  },
  {
    accessorKey: 'avatar',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Avatar
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => {
      const avatar = row.getValue('avatar') as string;
      const userName = row.getValue('userName') as string;
      return (
        <Avatar>
          <AvatarImage src={avatar || `https://avatar.iran.liara.run/public/boy?username=${userName}`} />
          {/* <AvatarFallback>
            {userName.slice(0, 2).toUpperCase()}
          </AvatarFallback> */}
        </Avatar>
      );
    },
  },
  {
    accessorKey: 'userName',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          User name
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => <div>{row.getValue('userName')}</div>,
  },
  {
    accessorKey: 'fullName',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2 w-40" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Full name
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => <div className="font-bold ">{row.getValue('fullName')}</div>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Email
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'birthDate',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2 truncate" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Date of birth
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => <div className="truncate">{row.getValue('birthDate') ? format(new Date(row.getValue('birthDate')), 'dd/MM/yyyy') : 'Empty'}</div>,
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Phone
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => <div>{row.getValue('phoneNumber')}</div>,
  },
  {
    accessorKey: 'gender',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Gender
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => (
      <div>
        {row.getValue('gender') ? (
          (row.getValue('gender') as string).toLowerCase() === 'male' ? (
            <OtherIcons icon="male" />
          ) : (
            <OtherIcons icon="female" className="text-[#FF7568]" />
          )
        ) : (
          <div>Empty</div>
        )}
      </div>
    ),
    filterFn: (row, id, filterValue) => {
      return filterValue.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'level',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Level
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => <div>{row.getValue('level')}</div>,
  },
  {
    accessorKey: 'address',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2 w-60" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Address
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => <div>{row.getValue('address')}</div>,
  },
  {
    accessorKey: 'roleID',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Type
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => {
      const roleId: number = row.getValue('roleID');
      const roleName = getRoleName(roleId);
      if (roleId === 1) {
        return <Badge className="truncate bg-red-200 text-red-500 hover:bg-red-200">{roleName}</Badge>;
      }
      if (roleId === 2) {
        return <Badge className="truncate bg-purple-200 text-purple-500 hover:bg-purple-200">{roleName}</Badge>;
      }
      if (roleId === 3) {
        return <Badge className="truncate bg-blue-200 text-blue-500 hover:bg-blue-200">{roleName}</Badge>;
      }
      if (roleId === 4) {
        return <Badge className="truncate bg-yellow-200 text-yellow-500 hover:bg-yellow-200">{roleName}</Badge>;
      }

      return <Badge className="truncate">{roleName}</Badge>;
    },
    filterFn: (row, id, filterValue) => {
      return filterValue.includes(row.getValue(id));
    },
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
      const isAccessable = useAuthorized({ requestTo: 'user', actionType: 'modify' });
      return isAccessable && <DataTableRowActions row={row} />;
    },
  },
];

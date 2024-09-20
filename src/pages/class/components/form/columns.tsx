'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { ColumnDef } from '@tanstack/react-table';

import OtherIcons from '@/components/icons/other-icons';
import { IUser } from '@/types/user';
import { format } from 'date-fns';
import SortIconStatus from './sort-icon-status';

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
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Full name
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => <div className="font-bold">{row.getValue('fullName')}</div>,
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
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Address
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => <div>{row.getValue('address')}</div>,
  },
];

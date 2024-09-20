'use client';

import { ColumnDef } from '@tanstack/react-table';

import SortIconStatus from './sort-icon-status';
import { DataTableRowActions } from './row-actions';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Class } from '@/types/class';
import { useNavigate } from 'react-router-dom';
import useAuthorized from '@/hooks/useAuthorized';

export const columns: ColumnDef<Class>[] = [
  {
    accessorKey: 'classId',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          ClassId
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => <div>{row.getValue('classId')}</div>,
  },
  {
    accessorKey: 'className',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Class Name
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => {
      const navigator = useNavigate();
      return (
        <div className="font-bold cursor-pointer hover:underline break-all overflow-hidden" onClick={() => navigator(`/class/${row.original.classId}`)}>
          {row.getValue('className')}
        </div>
      );
    },

    
  },
  {
    accessorKey: 'programId',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          ProgramID
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="font-bold text-center">{row.getValue('programId')}</div>;
    },

    filterFn: (row, id, filterValue) => {
      return filterValue.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'instructorId',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          InstructorID
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => <div className="lowercase text-center">{row.getValue('instructorId')}</div>,

    filterFn: (row, id, filterValue) => {
      return filterValue.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2 truncate" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          StartDate
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="truncate">
          {row.original.semester.semesterStartDate ? format(new Date(row.original.semester.semesterStartDate), 'dd/MM/yyyy') : 'Empty'}
        </div>
      )
    },

    filterFn: (row, id, filterValue) => {
      return filterValue.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'endDate',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2 truncate" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          EndDate
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => <div className="truncate">{row.original.semester.semesterEndDate ? format(new Date(row.original.semester.semesterEndDate), 'dd/MM/yyyy') : 'Empty'}</div>,

    filterFn: (row, id, filterValue) => {
      return filterValue.includes(row.getValue(id));
    },
  },
  // {
  //   accessorKey: 'time',
  //   header: ({ column }) => {
  //     return (
  //       <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
  //         Time
  //         <SortIconStatus columnIsSorted={column.getIsSorted()} />
  //       </div>
  //     );
  //   },
  //   cell: ({ row }) => {console.log(row.original);
  //   ;return <div>{row.original?.classTime}</div>},

  //   filterFn: (row, id, filterValue) => {
  //     return filterValue.includes(row.getValue(id));
  //   },
  // },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2 bg-br" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Status
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => {
      // const status = (row.getValue('status') as string).toLowerCase() === 'active' ? true : false;
      // return (
      //   <Badge className={`${status ? 'bg-green-200 text-green-500 hover:bg-green-200' : 'bg-red-200 hover:bg-red-200 text-red-500'}  capitalize`}>
      //     {status ? 'active' : 'inactive'}
      //   </Badge>
      // );
      const status = (row.getValue('status') as string).toLowerCase();
      let badgeColor = '';
      let badgeText = '';

      switch (status) {
        case 'active':
          badgeColor = 'bg-green-200 hover:bg-green-200 text-green-500';
          badgeText = 'Active';
          break;
        case 'deactive':
          badgeColor = 'bg-red-200 hover:bg-red-200 text-red-500';
          badgeText = 'Dective';
          break;
        default:
          badgeColor = 'bg-gray-200 hover:bg-gray-200 text-gray-500';
          badgeText = 'No status';
      }
      return <Badge className={`${badgeColor} capitalize`}>{badgeText}</Badge>;
    },
    filterFn: (row, id, filterValue) => {
      return filterValue.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const isModifyAccessable = useAuthorized({ requestTo: 'class', actionType: 'modify' });
      return isModifyAccessable && <DataTableRowActions row={row} />;
    },
  },
];

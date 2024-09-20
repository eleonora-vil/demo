'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { Badge } from '@/components/ui/badge';
import { Syllabus } from '@/types/syllabus';
import SortIconStatus from './sort-icon-status';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { DataTableRowActions } from './row-actions';

export const columns: ColumnDef<Syllabus>[] = [
  // {
  //   accessorKey: "syllabusId",
  //   header: ({ column }) => {
  //     return (
  //       <div
  //       className="flex items-center cursor-pointer gap-2"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Syllabus
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </div>
  //     )
  //   },
  //   cell: ({ row }) => (
  //     <div className="font-bold">{row.getValue("syllabusId")}</div>
  //   ),
  // },

  {
    accessorKey: 'syllabusId',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Syllabus Id
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => <div>{row.getValue('syllabusId')}</div>,
  },
  // {
  //   accessorKey: "code",
  //   header: "Code",
  //   cell: ({ row }) => (
  //     <div>{row.getValue("code")}</div>
  //   ),
  // },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Syllabus Name
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => (
      <Link to={`/syllabus/${row.getValue('syllabusId')}`} className="hover:underline font-semibold break-word overflow-hidden">
        {row.getValue('name') || 'Name is empty'}
      </Link>
    ),
  },
  {
    accessorKey: 'code',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Code
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => <div>{row.getValue('code')}</div>,
    filterFn: (row, id, filterValue) => {
      return filterValue.includes(row.getValue(id));
    },
  },

  // {
  //   accessorKey: "createdDate",
  //   header: ({ column }) => {
  //     return (
  //       <div
  //       className="flex items-center cursor-pointer gap-2"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Created On
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </div>
  //     )
  //   },
  //   cell: ({ row }) => (
  //     <div>{row.getValue("createdDate")}</div>
  //   ),
  // },
  {
    accessorKey: 'createdDate',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Created On
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => <div>{format(new Date(row.getValue('createdDate')), 'PPP')}</div>,

    filterFn: (row, id, filterValue) => {
      return filterValue.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'slot',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Duration (Slot)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => <div className="lowercase ">{row.getValue('slot')}</div>,
  },
  {
    accessorKey: 'outputStandards',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Output Standard
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-1 flex-wrap">
          {(row.getValue('outputStandards') as any[]).map((item) => (
            <Badge key={item.outputStandardId}>{item.tags}</Badge>
          ))}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "status",
  //   header: ({ column }) => {
  //     return (
  //       <div
  //       className="flex items-center cursor-pointer gap-2"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Status
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </div>
  //     )
  //   },
  //   cell: ({ row }) => (
  //     <Badge>{row.getValue("status")}</Badge>
  //   ),
  // },
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
      const status = (row.getValue('status') as string).toLowerCase();
      let badgeColor = '';
      let badgeText = '';

      switch (status) {
        case 'active':
          badgeColor = 'bg-green-200 hover:bg-green-200 text-green-500';
          badgeText = 'Active';
          break;
        case 'inactive':
          badgeColor = 'bg-red-200 hover:bg-red-200 text-red-500';
          badgeText = 'Inactive';
          break;
        case 'draft':
          badgeColor = 'bg-blue-200 hover:bg-blue-200 text-blue-500';
          badgeText = 'Draft';
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
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original;
  //     console.log(payment);
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Manage</DropdownMenuLabel>
  //           <Link to={`/syllabus/${row.getValue("syllabusId")}`}>
  //             <DropdownMenuItem className="cursor-pointer">
  //               View syllabus
  //             </DropdownMenuItem>
  //           </Link>
  //           <DropdownMenuSeparator />
  //           <Link to={`/syllabus/${row.getValue("syllabusId")}/update`}>
  //             <DropdownMenuItem className="cursor-pointer">
  //               Edit syllabus
  //             </DropdownMenuItem>
  //           </Link>
  //           <DropdownMenuItem>Duplicate syllabus</DropdownMenuItem>
  //           <DropdownMenuItem>De-activate syllabus</DropdownMenuItem>
  //           <DropdownMenuItem>Delete syllabus</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

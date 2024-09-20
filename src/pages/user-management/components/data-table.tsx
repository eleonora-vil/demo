'use client';

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { columns } from './columns';
// import { MOCK_DATA_USER } from "../data/data"
import Loading from '@/components/loading';
import { useAppSelector } from '@/hooks/useRedux';
import { getAllUsers } from '@/lib/api/user-api';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';

export function DataTable() {
  const [data, setData] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const isRender = useAppSelector((state) => state.isTableRender.isRender);
  const [queryID, setQueryID] = useSearchParams();
  const pageID = queryID.get('page');
  let pageNumber = 0;
  if (pageID == undefined) {
    pageNumber = 0;
  } else {
    pageNumber = parseInt(pageID);
  }

  const refreshData = () => {
    getAllUsers()
      .then((res) => {
        if (res.error != null) {
          toast.error('Get data Unuccessfully !', {
            position: 'top-left',
          });
        } else {
          setData(res.data?.result?.users);
          console.log(res.data?.result?.users);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    refreshData();
  }, [isRender]);

  React.useEffect(() => {
    refreshData();
  }, []);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: pageNumber, //custom initial page index
        pageSize: 10, //custom default page size
      },
    },
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  //  React.useEffect(()=>{
  //   if(pageID){
  //     console.log("page",pageID);
  //     console.log(table.getState().pagination.pageIndex);

  //   }

  //  },[queryID])

  return (
    <div className="w-full p-4 relative space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-lg border">
        <Table className="rounded-md bg-primary">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className=" text-white hover:bg-primary">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-white">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {!isLoading && (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className="bg-white hover:bg-white/95">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-primary bg-white">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
        {isLoading && (
          <div className="w-full h-80 flex items-center justify-center">
            <Loading />
          </div>
        )}
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}

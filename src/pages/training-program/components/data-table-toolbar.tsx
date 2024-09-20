import { Table } from '@tanstack/react-table';

import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  // function handleFilter(event: React.ChangeEvent<HTMLInputElement>) {
  //   const value = event.target.value;
  //   table.getColumn("programName")?.setFilterValue(value);
  // }
  const allDays = Array.from(table.getColumn('startDate')?.getFacetedUniqueValues()?.entries() || []).map(([key, value]) => key);
  const allStatus = Array.from(table.getColumn('status')?.getFacetedUniqueValues()?.entries() || []).map(([key, value]) => key);
  const allCreates = Array.from(table.getColumn('createBy')?.getFacetedUniqueValues()?.entries() || []).map(([key, value]) => key);
 
  
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter program name..."
          value={(table.getColumn('programName')?.getFilterValue() as string) || ''}
          onChange={(event) => table.getColumn('programName')?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('startDate') && <DataTableFacetedFilter column={table.getColumn('startDate')} title="Create On" options={allDays} />}
        {table.getColumn('createBy') && <DataTableFacetedFilter column={table.getColumn('createBy')} title="Create By" options={allCreates} />}
        {table.getColumn('status') && <DataTableFacetedFilter column={table.getColumn('status')} title="Status" options={allStatus} />}

        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}

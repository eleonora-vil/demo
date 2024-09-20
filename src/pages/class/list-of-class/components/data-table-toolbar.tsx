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
  const allStatus = Array.from(table.getColumn('status')?.getFacetedUniqueValues()?.entries() || []).map(([key]) => key);
  const allInstructors = Array.from(table.getColumn('instructorId')?.getFacetedUniqueValues()?.entries() || []).map(([key]) => key);
  const allPrograms = Array.from(table.getColumn('programId')?.getFacetedUniqueValues()?.entries() || []).map(([key]) => key);
  const allStartDate = Array.from(table.getColumn('startDate')?.getFacetedUniqueValues()?.entries() || []).map(([key]) => key);
  const allEndDate = Array.from(table.getColumn('endDate')?.getFacetedUniqueValues()?.entries() || []).map(([key]) => key);

  
  
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter ClassName..."
          value={(table.getColumn('className')?.getFilterValue() as string) || ''}
          onChange={(event) => { 
          return table.getColumn('className')?.setFilterValue(event.target.value)}}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn('instructorId') && <DataTableFacetedFilter column={table.getColumn('instructorId')} title="Instructor Id" options={allInstructors} />}
        {table.getColumn('programId') && <DataTableFacetedFilter column={table.getColumn('programId')} title="Program Id" options={allPrograms} />}
        {table.getColumn('startDate') && <DataTableFacetedFilter column={table.getColumn('startDate')} title="Start Date" options={allStartDate} />}
        {table.getColumn('endDate') && <DataTableFacetedFilter column={table.getColumn('endDate')} title="End Date" options={allEndDate} />}
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

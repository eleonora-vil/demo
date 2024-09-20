import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  console.log(table.getAllColumns());
  
  const allCode = Array.from(table.getColumn('code')?.getFacetedUniqueValues()?.entries() || []).map(([key, value]) => key);
  const allCreateOn = Array.from(table.getColumn('createdDate')?.getFacetedUniqueValues()?.entries() || []).map(([key, value]) => key);
  // const allCreateBy = Array.from(table.getColumn('inStructorName')?.getFacetedUniqueValues()?.entries() || []).map(([key, value]) => key);
  const allStatus = Array.from(table.getColumn('status')?.getFacetedUniqueValues()?.entries() || []).map(([key, value]) => key);

  // function handleFilter(event: React.ChangeEvent<HTMLInputElement>) {
  //   const value = event.target.value;

  //   // table.getColumn("code")?.setFilterValue(value);

  //   table.getColumn("code")?.setFilterValue(value);
  // }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter syllabus name  or code..."
          value={table.getColumn('name')?.getFilterValue() as string}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn('code') && <DataTableFacetedFilter column={table.getColumn('code')} title="Code" options={allCode} />}
        {table.getColumn('createdDate') && <DataTableFacetedFilter column={table.getColumn('createdDate')} title="Created on" options={allCreateOn} />}
        {/* {table.getColumn('inStructorName') && <DataTableFacetedFilter column={table.getColumn('inStructorName')} title="Create by" options={allCreateBy} />} */}
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

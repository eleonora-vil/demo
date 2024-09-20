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

  const allStatus = Array.from(table.getColumn('status')?.getFacetedUniqueValues()?.entries() || []).map(([key, value]) => key);
  const allGender = Array.from(table.getColumn('gender')?.getFacetedUniqueValues()?.entries() || []).map(([key, value]) => key);
  const allRoles = Array.from(table.getColumn('roleID')?.getFacetedUniqueValues()?.entries() || []).map(([key, value]) => key);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter username..."
          value={(table.getColumn('userName')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('userName')?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('roleID') && <DataTableFacetedFilter column={table.getColumn('roleID')} title="Role" options={allRoles} />}
        {table.getColumn('gender') && <DataTableFacetedFilter column={table.getColumn('gender')} title="Gender" options={allGender} />}
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

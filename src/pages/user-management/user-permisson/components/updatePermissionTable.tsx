import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table } from '@/components/ui/table';
import { ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import React, { useEffect, useState } from 'react';
import { roleData } from './data';
import { columns } from './colums';
import DropDownBox from './dropDownBox';
import { Button } from '@/components/ui/button';
import { Navigate, useNavigate } from 'react-router-dom';
import { getData, updateData } from '@/lib/api/permissionTable';
import { any } from 'zod';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/hooks/useRedux';
import { updateReRenderFunction } from '@/lib/redux/dataTableSlice';
import { switchTrigger } from '@/lib/redux/authorizedSlice';
export const UpdatePermissionTable = ({ method, value }: any) => {
  const navigation = useNavigate();
  // const [data, setData] = React.useState([{
  //   permissionId: 0,
  //   syllabusAccess: "",
  //   programAccess: "",
  //   userAccess: "",
  //   classAccess: "",
  //   materialAccess: "",
  //   roleID: 0,
  //   role: "",
  // }]);
  const [permissionSchema, setPermissionSchema] = useState([]);

  const [data, setData] = React.useState(roleData);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const init = () => {
      getData().then((res) => {
        console.log(res.data.result.permissions);
        setPermissionSchema(res.data.result.permissions);
      });
    };
    init();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const submitFunction = async () => {
    console.log('on submit');
    console.log(permissionSchema);

    const newData = permissionSchema.map((item) => {
      delete item['role'];
      Object.assign(item, { permissions: '' });
      return item;
    });
    console.log(newData);
    if ((await updateData(newData)).error) {
      toast.error((await updateData(newData)).error, {
        position: 'top-left',
      });
    } else {
      const result = (await updateData(newData)).data;

      console.log(result);
      toast.success('Update Success', {
        position: 'top-left',
      });
      dispatch(updateReRenderFunction());
      dispatch(switchTrigger());
      method(false);
      return result;
    }
  };

  return (
    <div className="w-full p-4 relative">
      {/* <div className="flex items-center py-4">
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value:boolean) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
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
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className="bg-white hover:bg-white/95">
                {row.getVisibleCells().map((cell, index) => {
                  return index == 0 ? (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ) : (
                    <TableCell key={cell.id}>
                      {permissionSchema.length != 0 && <DropDownBox cellID={cell.id} cell={cell} rowID={row.id} row={row} method={setPermissionSchema} value={permissionSchema} />}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="w-full h-28 p-5 justify-between items-center inline-flex">
        <div></div>

        <div className="w-[331px] self-stretch p-5 justify-end items-center gap-2.5 flex">
          <div className="w-12 py-0.5 rounded-lg justify-center items-center gap-[5px] flex">
            <div
              className="text-red-500 text-sm font-bold font-['Inter'] underline leading-normal cursor-pointer"
              onClick={() => {
                method(false);
              }}
            >
              Cancel
            </div>
          </div>
          <Button
            className="w-[83px] px-[25px] py-0.5 bg-gray-700 rounded-lg shadow justify-center items-center gap-[5px] flex text-white text-sm font-bold font-['Inter'] leading-normal"
            onClick={submitFunction}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

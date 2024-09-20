import ActionIcons from '@/components/icons/action-icons';
import DocumentManageIcons from '@/components/icons/document-manage-icons';
import SyllabusStatus from '@/components/status/syllabus-status';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const CreateNextPage = () => {
  const programName = localStorage.getItem('programName');
  const [programs, setPrograms] = useState<any>([]);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get('https://64b391030efb99d8626807b5.mockapi.io/programs');
      const programData = Array.isArray(response.data) ? response.data : [];
      setPrograms(programData);
      if (programData.length > 0) {
        setPrograms(programData[0]);
      }
    } catch (err) {
      console.error('Error fetching students:', err);
      setPrograms([]);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return (
    <div className="">
      <div className="bg-primary py-3 px-10 border-t-white border-t flex justify-between items-center">
        <div>
          <a className="text-white flex text-h4 font-extralight">Training Program</a>
          <div className="flex items-center">
            <a className="text-white text-h3 font-semibold">{programName}</a>
            <div className="ml-4">
              <SyllabusStatus status="Inactive" />
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-white hover:bg-white hover:text-black rounded-full p-2">
            <ActionIcons icon="more-horizontal"></ActionIcons>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Manage</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-blue-500">
              <DocumentManageIcons icon="create" className="me-2" /> Edit program
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-blue-500">
              <DocumentManageIcons icon="copy" className="me-2" />
              Duplicate program
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-blue-500">
              <ActionIcons icon="visibility-off" className="me-2" /> De-active program
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-gray-500">
              {' '}
              <DocumentManageIcons icon="delete-forever" className="me-2" />
              Delete program
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="py-5 px-10 border">
        <div className="border-r border-r-white pr-6">asdsa</div>
        <div className="font-semibold">Modified on {programs.createdOn}</div>
      </div>
      <div className="text-h3 py-1 px-10 font-bold">Content</div>
      <div className="px-5">
        <div className="mb-5">
          <div className="mt-5 h-24 w-3/4 border-spacing-4 rounded-2xl bg-white shadow-md shadow-gray-400 text-nowrap">
            <div className="p-5">
              <div className=" gap-5 flex items-center relative">
                <p className="tracking-widest font-semibold font-inter text-2xl text-[#8B8B8B] ">Linux</p>
                <SyllabusStatus status="Inactive" />
              </div>
              <div className="flex text-sm leading-5.5 mt-2.5 font-semibold text-[#8B8B8B]">
                <p>LIN v.20</p>
                <span className="mx-2.5">|</span>
                <p>4 days (12 hours)</p>
                <span className="mx-2.5">|</span>
                <p>Modified on 23/07/2022 by Johny Deep</p>
              </div>
            </div>
          </div>
          <div className="mt-5 h-24 w-3/4 border-spacing-4 rounded-2xl bg-white shadow-md shadow-gray-400 text-nowrap">
            <div className="p-5">
              <div className=" gap-5 flex items-center relative">
                <p className="tracking-widest font-semibold font-inter text-2xl text-[#8B8B8B] ">Linux</p>
                <SyllabusStatus status="Inactive" />
              </div>
              <div className="flex text-sm leading-5.5 mt-2.5 font-semibold text-[#8B8B8B]">
                <p>LIN v.20</p>
                <span className="mx-2.5">|</span>
                <p>4 days (12 hours)</p>
                <span className="mx-2.5">|</span>
                <p>Modified on 23/07/2022 by Johny Deep</p>
              </div>
            </div>
          </div>
          <div className="mt-5 h-24 w-3/4 border-spacing-4 rounded-2xl bg-white shadow-md shadow-gray-400 text-nowrap">
            <div className="p-5">
              <div className=" gap-5 flex items-center relative">
                <p className="tracking-widest font-semibold font-inter text-2xl text-[#8B8B8B] ">Linux</p>
                <SyllabusStatus status="Inactive" />
              </div>
              <div className="flex text-sm leading-5.5 mt-2.5 font-semibold text-[#8B8B8B]">
                <p>LIN v.20</p>
                <span className="mx-2.5">|</span>
                <p>4 days (12 hours)</p>
                <span className="mx-2.5">|</span>
                <p>Modified on 23/07/2022 by Johny Deep</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Command>
        {' '}
        Select syllabus
        <CommandInput placeholder="Enter syllabus you want to search" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Syllabus">
            <CommandItem>
              <div className="w-full">
                <p>Introduction to programming</p>
                <div className="flex justify-between">
                  <div>7.5hrs</div>
                  <div>2022-02-15 by Jane Doe</div>
                </div>
              </div>
            </CommandItem>
            <CommandItem>
              <div className="w-full">
                <p>Introduction to programming</p>
                <div className="flex justify-between">
                  <div>7.5hrs</div>
                  <div>2022-02-15 by Jane Doe</div>
                </div>
              </div>
            </CommandItem>
            <CommandItem>
              <div className="w-full">
                <p>Introduction to programming</p>
                <div className="flex justify-between">
                  <div>7.5hrs</div>
                  <div>2022-02-15 by Jane Doe</div>
                </div>
              </div>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      <div className="flex justify-between mt-16 px-10">
        <Link to="/training-program/create">
          <Button className="">Back</Button>
        </Link>
        <div className=" flex px-10">
          <button className="text-red-600 underline mr-4 font-bold ">Cancel</button>
          <Link to="/training-program/Create/Result">
            <Button className="">Save</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

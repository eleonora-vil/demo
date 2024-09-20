import React from 'react';
import Header from './components/Header';
import General from './components/General';
import TimeFrame from './components/TimeFrame';
import Attendee from './components/Attendee';
import TrainingProgram from './components/TrainingProgram';
import AttendeeList from './components/AttendeeList';
import { SyllabusTabs } from '@/components/syllabus-tab';
import Others from './components/Others';
import Budget from './components/Budget';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const CreateClassPage = () => {
  return (
    <div>
      <Header />
      <div className="p-3">
        <div className="grid-cols-3 grid gap-3 mb-5 ">
          <div className="col-span-1 flex flex-col gap-3">
            <General />
            <Attendee />
          </div>
          <div className="col-span-2">
            <TimeFrame />
          </div>
        </div>
        <SyllabusTabs
          tabs={[
            {
              label: 'Training Program',
              content: <TrainingProgram />,
            },
            {
              label: 'Attendee List',
              content: <AttendeeList />,
            },
            {
              label: 'Budget',
              content: <Budget />,
            },
            {
              label: 'Others',
              content: <Others />,
            },
          ]}
        />
        <div className="w-full h-28 p-5 justify-between items-center inline-flex">
          <Link to="/class/create">
            <Button className="text-white text-sm font-bold font-['Inter'] leading-normal w-[84px] px-[25px] py-0.5 bg-gray-700 rounded-lg shadow justify-center items-center gap-[5px] flex">
              Back
            </Button>
          </Link>
          <div className="w-[331px] self-stretch p-5 justify-end items-center gap-2.5 flex">
            <div className="w-12 py-0.5 rounded-lg justify-center items-center gap-[5px] flex">
              <div className="text-red-500 text-sm font-bold font-['Inter'] underline leading-normal">Cancel</div>
            </div>

            <Button className="w-[140px] px-[25px] py-0.5 bg-zinc-700 rounded-lg shadow justify-center items-center gap-[5px] flex text-white text-sm font-bold font-['Inter'] leading-normal">
              Save as draft{' '}
            </Button>
            <Link to="/class/create/classdetail/next/view">
              <Button className="w-[83px] px-[25px] py-0.5 bg-gray-700 rounded-lg shadow justify-center items-center gap-[5px] flex text-white text-sm font-bold font-['Inter'] leading-normal">
                Next
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

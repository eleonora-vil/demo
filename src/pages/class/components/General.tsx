import DeliveryTypesIcons from '@/components/icons/delivery-types-icons';
import IndicatorIcons from '@/components/icons/indicator-icons';
import NavigationIcons from '@/components/icons/navigation-icons';
import OtherIcons from '@/components/icons/other-icons';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';
import Collapse from './Collapse';
const data = {
  classTime: '09:00 - 12:00',
  locations: ['Ftown2', 'Ftown1'],
  trainers: [
    {
      id: 1,
      name: 'Dinh Vu Quoc Trung',
      profileURL: 'https://www.google.com',
    },
    {
      id: 2,
      name: 'Ba Chu Heo',
      profileURL: 'https://www.google.com',
    },
    {
      id: 3,
      name: 'Hu Cheo Ba',
      profileURL: 'https://www.google.com',
    },
    {
      id: 4,
      name: 'Tap The Lop',
      profileURL: 'https://www.google.com',
    },
  ],
  admins: [
    {
      id: 1,
      name: 'Ly Lien Lien Dung',
      profileURL: 'https://www.google.com',
    },
    {
      id: 2,
      name: 'Dung Lien Lien Ly',
      profileURL: 'https://www.google.com',
    },
  ],
  FSU: {
    name: 'FHM',
    contact: 'BaCH@fsoft.com.vn',
  },
  createdAt: '2022-03-25',
  createdBy: 'DanPL',
  reviewedAt: '2022-03-30',
  reviewedBy: 'TrungDVQ',
  approvedAt: '2022-03-02',
  approvedBy: 'VongNT',
};
const General = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <Collapse icon={<NavigationIcons icon={'calendar-today'} />} title="General" {...props}>
      {/* CLASS TIME */}
      <div className="p-5">
        <div className="grid grid-cols-3">
          <div className="col-span-1  font-bold">
            <div className="flex items-center">
              <OtherIcons icon="alarm" className="mr-2 text-black" />
              Time
            </div>
          </div>
          <div className="col-span-1">
            from <input type="time" className="border border-1 rounded-sm" />
          </div>
          <div className="col-span-1">
            To <input type="time" className="border border-1 rounded-sm" />
          </div>
        </div>
        {/* LOCATION */}
        <div className="grid grid-cols-3 py-3">
          <div className="col-span-1 font-bold">
            <div className="flex items-center">
              <OtherIcons icon="domain" className="mr-2 text-black" /> Location
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            {data.locations.map((location, index) => (
              <div key={`location-${index}`}></div>
            ))}
          </div>
        </div>
        {/* TRAINER */}
        <div className="grid grid-cols-3 py-3">
          <div className="col-span-1 font-bold">
            <div className="flex items-center">
              <DeliveryTypesIcons icon="lecture" className="mr-2 text-black" /> Trainer
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            {/* {data.trainers.map((trainer, index) => ( */}
            <div className="flex gap-1">
              <a className="text-black underline underline-offset-2"></a>
              {/* <IndicatorIcons
                  icon="warning-logo"
                  className="w-2 text-green"
                /> */}
            </div>
            {/* ))} */}
          </div>
        </div>
        {/* ADMIN */}
        <div className="grid grid-cols-3 py-3">
          <div className="col-span-1 font-bold">
            <div className="flex items-center">
              <IndicatorIcons icon="grade" className="mr-2 text-black" /> Admin
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            {/* {data.admins.map((admin, index) => (
            //   <div key={`trainer-${index}`} className="flex gap-1">
            //     <a
            //       href={admin.profileURL}
            //       className="text-blue-600 underline underline-offset-2"
            //     >
            //       {admin.name}
            //     </a>
            //     <IndicatorIcons
            //       icon="warning-logo"
            //       className="w-2 text-green"
            //     />
            //   </div> */}
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choose Admin" />
              </SelectTrigger>
              <SelectContent>
                {data.admins.map((admin, index) => (
                  <SelectItem value={admin.name} key={index}>{admin.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {/* FSU */}
      <div className="p-5">
        <div className="grid grid-cols-3">
          <div className="col-span-1  font-bold">
            <div className="flex items-center">
              <IndicatorIcons icon="supplier" className="mr-2 text-black" /> FSU time
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choose FSU time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={data.FSU.name}>{data.FSU.name}</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choose contact" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={data.FSU.name}>{data.FSU.contact} </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border-b border-b-black my-3" />
        {/* CREATED */}
        <div className="grid grid-cols-3 my-2">
          <div className="col-span-1  font-bold">Created</div>
          <div className="col-span-2">
            <div>{/* {formatDate(new Date(data.createdAt))} by {data.createdBy} */}</div>
          </div>
        </div>
        {/* REVIEW */}
        <div className="grid grid-cols-3 my-2">
          <div className="col-span-1  font-bold">Review</div>
          <div className="col-span-2">
            <div>{/* {formatDate(new Date(data.reviewedAt))} by {data.reviewedBy} */}</div>
          </div>
        </div>
        {/* APPROVE */}
        <div className="grid grid-cols-3 my-2">
          <div className="col-span-1  font-bold">Approve</div>
          <div className="col-span-2">
            <div>{/* {formatDate(new Date(data.approvedAt))} by {data.approvedBy} */}</div>
          </div>
        </div>
      </div>
    </Collapse>
  );
};

export default General;

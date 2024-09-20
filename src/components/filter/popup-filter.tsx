import { useState } from 'react';
import { TimePicker } from '../time-picker';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import ActionIcons from '../icons/action-icons';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';

const PopupFilter = () => {
  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
  };

  const onChangeDate = (date: any, dateString: any) => {
    console.log(date, dateString);
  };
  const togglePopupVisibility = () => {
    setPopupVisible(!isPopupVisible);
  };
  const [isPopupVisible, setPopupVisible] = useState(false);
  const dataClasstime = [
    {
      label: 'Morning',
      value: 'morning',
      desc: 'Morning',
    },
    {
      label: 'Noon',
      value: 'noon',
      desc: 'Noon',
    },
    {
      label: 'Night',
      value: 'night',
      desc: 'Night',
    },
    {
      label: 'Online',
      value: 'online',
      desc: 'Online',
    },
  ];
  const dataStatus = [
    {
      label: 'Planning',
      value: 'planing',
      desc: 'Planning',
    },
    {
      label: 'Openning',
      value: 'openning',
      desc: 'Openning',
    },
    {
      label: 'Closed',
      value: 'closed',
      desc: 'Closed',
    },
  ];
  const optionsClassLocation = [
    {
      label: 'China',
      value: 'china',
      emoji: '🇨🇳',
      desc: 'China (中国)',
    },
    {
      label: 'USA',
      value: 'usa',
      emoji: '🇺🇸',
      desc: 'USA (美国)',
    },
    {
      label: 'Japan',
      value: 'japan',
      emoji: '🇯🇵',
      desc: 'Japan (日本)',
    },
    {
      label: 'Korea',
      value: 'korea',
      emoji: '🇰🇷',
      desc: 'Korea (韩国)',
    },
  ];
  const dataAttendee = [
    {
      label: 'Intern',
      value: 'intern',
      desc: 'Intern',
    },
    {
      label: 'Fresher',
      value: 'fresher',
      desc: 'Fresher',
    },
    {
      label: 'Online fee-fresher',
      value: 'online fee-fresher',
      desc: 'Online fee-fresher',
    },
    {
      label: 'Offline fee-fresher',
      value: 'offline fee-fresher',
      desc: 'Offline fee-fresher',
    },
  ];
  const optionsFSU = [
    { label: 'Chubedan', value: 'chubedan', desc: 'Chubedan' },
    { label: 'Chubegioi', value: 'chubegioi', desc: 'Chubegioi' },
    { label: 'Chubekha', value: 'chubekha', desc: 'Chubekha' },
  ];
  const optionsTrainer = [
    { label: 'Giabao', value: 'giabao', desc: 'Giabao' },
    { label: 'Giahuy', value: 'giahuy', desc: 'Giahuy' },
    { label: 'Giahuan', value: 'giahuan', desc: 'Giahuan' },
  ];
  return (
    <div className="relative">
      {/*Hien Popup */}
      <Popover>
        <PopoverTrigger>
          <div className="px-2.5 py-[7px] bg-gray-700 rounded-lg shadow justify-center items-center gap-[5px] inline-flex" onClick={togglePopupVisibility}>
            <ActionIcons icon="filter-list" className="text-white" />
            <div className="text-white text-sm font-boldleading-normal">Filter</div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="grid grid-cols-12 gap-5 w-[800px] absolute -left-10">
          <div className="col-span-6">
            <div>
              <div className="font-bold mb-1">Class location</div>
              <div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {optionsClassLocation.map((classLocation) => (
                      <SelectItem value={classLocation.value} key={classLocation.value}>
                        {classLocation.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="col-span-6">
            <div className="font-bold mb-1">Class time frame</div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div>from</div>
                <div className="">
                  {/* fix later */}
                  <TimePicker />
                  {/* <div className="w-4 h-4 relative"></div> */}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div>to</div>
                <div>
                  {/* fix later */}
                  <TimePicker />
                  {/* <div className="w-4 h-4 relative"></div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 flex gap-5">
            <div className="font-bold">Class time</div>
            <div>
              {dataClasstime.map((classtime) => (
                <div className="flex items-center gap-1 mb-3" key={classtime.desc}>
                  <Checkbox></Checkbox>
                  <div>{classtime.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-3 flex gap-5">
            <div className="font-bold">Status</div>
            <div>
              {dataStatus.map((status, index) => (
                <div key={`status-${index}`} className="flex items-center gap-1 mb-3">
                  <Checkbox></Checkbox> <div>{status.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-5 flex gap-5">
            <div className="font-bold">Attendee</div>
            <div>
              {dataAttendee.map((attendee, index) => (
                <div key={`attendee-${index}`} className="flex items-center gap-1 mb-3">
                  <Checkbox></Checkbox> <div>{attendee.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-6 flex items-center gap-5">
            <div className="font-bold">FSU</div>
            <Select onValueChange={handleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                {optionsFSU.map((fsu, index) => (
                  <SelectItem key={`fsu-${index}`} value={fsu.value}>
                    {fsu.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-6 flex items-center gap-5">
            <div className="font-bold">Trainer</div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                {optionsTrainer.map((trainer, index) => (
                  <SelectItem key={`trainer-${index}`} value={trainer.value}>
                    {trainer.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-12 flex gap-3 justify-end">
            <Button className="w-[100px]">Clear</Button>
            <Button className="w-[100px]">Search</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PopupFilter;

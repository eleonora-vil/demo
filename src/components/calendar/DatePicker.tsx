// import {
//   CalendarOutlined,
//   DownOutlined,
//   LeftOutlined,
//   RightOutlined,
// } from "@ant-design/icons";
// import { Button, Dropdown, MenuProps, Space, Typography } from "antd";
import React, { useState } from 'react';
import { daysOfWeek, getDaysInMonth, monthAbbreviation } from '@/utils/DateUtils';

type DateInputProps = {
  value?: Date;
  onChange?: () => void;
};
const DateInput = ({ value }: DateInputProps) => {
  const displayText: string = !value ? '--/--/----' : `${String(value.getDate()).padStart(2, '0')}/${String(value.getMonth() + 1).padStart(2, '0')}/${value.getFullYear()}`;
  return (
    <div className="flex gap-2 select-none cursor-pointer border-zinc-500 border px-3 py-1 rounded-md">
      <div className="font-medium text-zinc-500">{displayText}</div>
      <div>{/* <CalendarOutlined /> */}</div>
    </div>
  );
};

const DatePickerModal = () => {
  const currentDate = new Date();
  const [displayingMonth, setDisplayingMonth] = useState<number>(currentDate.getMonth() + 1);
  const [displayingYear, setDisplayingYear] = useState<number>(currentDate.getFullYear());
  const handlePrevClick = () => {
    setDisplayingMonth((prev) => {
      if (prev === 1) {
        setDisplayingYear(displayingYear - 1);
        return 12;
      }
      return prev - 1;
    });
  };
  const handleNextClick = () => {
    setDisplayingMonth((prev) => {
      if (prev === 12) {
        setDisplayingYear(displayingYear + 1);
        return 1;
      }
      return prev + 1;
    });
  };
  const prevDayElements = [];
  const firstDateOfMonth = new Date(displayingYear, displayingMonth - 1, 1);
  for (let i = 0; i < firstDateOfMonth.getDay(); i++) {
    prevDayElements.push(<div key={`prev-month-calendar-${displayingMonth}/${displayingYear}/${i}`}></div>);
  }

  // const items: MenuProps["items"] = [
  //   {
  //     key: "0",
  //     label: "January",
  //   },
  //   {
  //     key: "1",
  //     label: "February",
  //   },
  //   {
  //     key: "2",
  //     label: "March",
  //   },
  //   {
  //     key: "3",
  //     label: "April",
  //   },
  //   {
  //     key: "4",
  //     label: "May",
  //   },
  //   {
  //     key: "5",
  //     label: "June",
  //   },
  //   {
  //     key: "6",
  //     label: "July",
  //   },
  //   {
  //     key: "7",
  //     label: "August",
  //   },
  //   {
  //     key: "8",
  //     label: "September",
  //   },
  //   {
  //     key: "9",
  //     label: "October",
  //   },
  //   {
  //     key: "10",
  //     label: "November",
  //   },
  //   {
  //     key: "11",
  //     label: "December",
  //   },
  // ];

  return (
    <div className="p-5 flex flex-col justify-center items-center px-10 shadow-[5px_10px_20px_rgba(0,0,0,0.2)]">
      {/* <div className="flex mb-4 justify-between w-full text-lg">
        <div>
          <Button
            className="text-slate-700"
            type="primary"
            shape="circle"
            icon={<LeftOutlined />}
            onClick={handlePrevClick}
          />
        </div>
        <div className="font-bold w-[220px] border-b pb-4 text-center text-lg flex justify-center gap-2">
          <div className="cursor-pointer">
            <Dropdown
              menu={{
                items,
                selectable: true,
                defaultSelectedKeys: ["3"],
              }}
            >
              <div className="flex gap-2 items-center">
                {monthAbbreviation[displayingMonth - 1]}
                <div className="text-sm text-zinc-500">
                  <DownOutlined />
                </div>
              </div>
            </Dropdown>
          </div>

          <div className="cursor-pointer">
            <Dropdown
              menu={{
                items,
                selectable: true,
                defaultSelectedKeys: [displayingMonth + ""],
              }}
            >
              <div className="flex gap-2 items-center">
                {displayingYear}
                <div className="text-sm text-zinc-500">
                  <DownOutlined />
                </div>
              </div>
            </Dropdown>
          </div>
        </div>
        <div>
          <Button
            className="text-slate-700"
            type="primary"
            shape="circle"
            icon={<RightOutlined />}
            onClick={handleNextClick}
          />
        </div>
      </div> */}
      <div className="grid grid-cols-7 gap-x-10 gap-y-4 uppercase ">
        {daysOfWeek.map((dayOfWeek) => (
          <div className="text-center text-sm" key={`${displayingMonth}-day-of-week-${dayOfWeek}`}>
            {dayOfWeek}
          </div>
        ))}
        {prevDayElements}
        {getDaysInMonth(displayingYear, displayingMonth).map((day) => {
          const currentDate = new Date(displayingYear, displayingMonth - 1, day);

          return <div className={`text-center font-bold rounded-full aspect-square flex justify-center items-center `}>{day}</div>;
        })}
      </div>
    </div>
  );
};

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2024, 0, 11));
  return (
    <React.Fragment>
      <div className="mb-5">
        <DateInput value={selectedDate} />
      </div>
      <div>
        <DatePickerModal />
      </div>
    </React.Fragment>
  );
};

export default DatePicker;

import NavigatorIcons from '@/components/icons/navigator-icons';
import { addDays, subDays } from 'date-fns';

import { daysOfWeek, getSundayOfThisWeek } from '@/utils/DateUtils';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import SelectMonth from './SelectMonth';
import SelectYear from './SelectYear';

type CalendarHeaderProps = {
  displayDate: string;
  setDisplayDate: Dispatch<SetStateAction<string>>;
};
const CalendarHeader = ({ displayDate, setDisplayDate }: CalendarHeaderProps) => {
  console.log(displayDate);
  
  const today = new Date();
  const yearArray = [2024, 2023, 2022, 2021, 2020, 2018, 2019, 2017, 2016, 2015, 2014];
  const [weekArray, setWeekArray] = useState([0, 0, 0, 0, 0, 0, 0]);
  useEffect(() => {
    getWeek(new Date(displayDate));
  }, [displayDate]);
  const getWeek = (date: Date) => {
    const newArray = [0, 0, 0, 0, 0, 0, 0];
    const weekIndex = date.getDay();
    newArray[weekIndex] = date.getDate();

    const result = newArray.map((item, index) => {
      if (index != weekIndex) {
        if (weekIndex - index > 0) {
          return (item = subDays(date, weekIndex - index).getDate());
        } else {
          return (item = addDays(date, index - weekIndex).getDate());
        }
      } else {
        return item;
      }
    });
    setWeekArray(result);
  };
  const increaseDay = (today: Date) => {
    today.setDate(today.getDate() + 7);
    if (today.toDateString() != displayDate) {
      setDisplayDate(today.toDateString());
    }
    else {
      console.log('no change');
    }
  };
  const decreaseDay = (today: Date) => {
    today.setDate(today.getDate() - 7);
    console.log(today.toDateString());
    
    if (today.toDateString() != displayDate) {
      setDisplayDate(today.toDateString());
    } else {
      console.log('no change');
    }
  };
  const selectSetMonth = (value: any) => {
    
    console.log(value);
    
    console.log(getSundayOfThisWeek(displayDate).toDateString());
    
    today.setMonth(Number(value));

    if (today.toDateString() != displayDate) {
      today.setDate(getSundayOfThisWeek(today.toDateString()).getDate())
      setDisplayDate(today.toDateString());
    } else {
      console.log('no change');
    }
  };
  const selectSetYear = (value: any) => {
    today.setFullYear(Number(value));
    if (today.toDateString() != displayDate) {
      setDisplayDate(today.toDateString());
    } else {
      console.log('no change');
    }
  };

  return (
    <div>
      <hr className="my-4" />
      <div className="flex justify-center gap-2">
        <button onClick={() => decreaseDay(new Date(displayDate))}>
          <NavigatorIcons icon="arrow-back" />
        </button>
        <div className="w-[100px]">
          <SelectMonth method={selectSetMonth} defaultValue={today.getMonth()} value={displayDate}/>
        </div>
        <div className="w-[100px]">
          <SelectYear method={selectSetYear} defaultValue={today.getFullYear()} data={yearArray} />
        </div>
        <button onClick={() => increaseDay(new Date(displayDate))}>
          <NavigatorIcons icon="arrow-forward" />
        </button>
      </div>
      <div className="flex justify-center">
        <hr className="my-5 w-[500px]" />
      </div>
      <div className="grid grid-cols-7 text-center">
        {daysOfWeek.map((day, index) => {
          return (
            <div className="pb-3 uppercase font-semibold" key={`day-of-week-${index}`}>
              {day}
            </div>
          );
        })}
        {weekArray.map((item, index) => {
          return (
            <div key={index} className="bg-gray-200">
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarHeader;

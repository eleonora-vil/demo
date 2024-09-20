import { compareDate, daysOfWeek, getDaysInMonth, monthAbbreviation } from '@/utils/DateUtils';
import { useState } from 'react';
import DeliveryTypesIcons from '../icons/delivery-types-icons';
import NavigatorIcons from '../icons/navigator-icons';
import OtherIcons from '../icons/other-icons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

type MonthCalendarPropsType = {
  year: number;
  month: number;
  learningDates?: learningDate[];
  onPrev?: () => void;
  onNext?: () => void;
} | any;

type User = {
  id: number;
  name: string;
  profileURL: string;
};

type learningDate = {
  id: number;
  date: Date;
  className: string;
  dateOrder: string;
  unitIndex: string;
  unitTitle: string;
  location: string;
  trainer: User;
  admin: User;
};

export const MonthCalendar = ({ year, month, onPrev, onNext, learningDates = [] }: MonthCalendarPropsType) => {
  const firstDateOfMonth = new Date(year, month - 1, 1);
  const prevDayElements = [];
  for (let i = 0; i < firstDateOfMonth.getDay(); i++) {
    prevDayElements.push(<div key={`prev-month-calendar-${month}/${year}/${i}`}></div>);
  }
  return (
    <div className="p-5 flex flex-col justify-center items-center w-full">
      <div className="flex mb-4 justify-between w-full">
        <div>
          {onPrev && (
            <button onClick={onPrev}>
              <NavigatorIcons icon="arrow-back" />
            </button>
          )}
        </div>
        <div className="font-bold w-[220px] border-b pb-4 text-center text-lg">
          <span>{monthAbbreviation[month - 1]} </span>
          <span>{year}</span>
        </div>
        <div>
          {onNext && (
            <button onClick={onNext}>
              <NavigatorIcons icon="arrow-forward" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-y-4 uppercase w-full">
        {daysOfWeek.map((dayOfWeek) => (
          <div className="text-center text-sm" key={`${month}-day-of-week-${dayOfWeek}`}>
            {dayOfWeek}
          </div>
        ))}
        {prevDayElements}
        {getDaysInMonth(year, month).map((day) => {
          const currentDate = new Date(year, month - 1, day);
          const today = new Date();
          const isActive: boolean = learningDates?.classDetail?.length > 0 && learningDates?.classDetail.some((learningDate:any) => compareDate(new Date(learningDate.day), currentDate));
          const isToday: boolean = compareDate(today, currentDate);

          let dateClassName = 'select-none rounded-full aspect-square w-[25px] flex justify-center items-center ';
          if (isToday) {
            dateClassName += 'bg-blue-700 text-white';
          } else if (isActive) {
            dateClassName += 'bg-black text-white';
          }

          if (isActive) {
            const dayInfo:any = learningDates?.classDetail.find((learningDate:any) => compareDate(new Date(learningDate.day), currentDate)) as learningDate;
            return (
              <Tooltip key={`month-calendar-${year}/${month}/${day}`}>
                <TooltipTrigger>
                  <div className={`font-bold flex justify-center items-center h-[25px]`}>
                    <div className={dateClassName}>
                      {day}

                    </div>
                  </div>
                </TooltipTrigger>

                <TooltipContent className="bg-primary text-white normal-case p-3">
                  <div className="font-bold mb-2">{dayInfo.className}</div>
                  <div>{dayInfo.dateOrder}</div>
                  {/* <div className="mb-3">
                    {dayInfo.unitIndex}: <span className="font-bold">{dayInfo.unitTitle}</span>
                  </div> */}
                  <div className="grid grid-cols-5 gap-y-1">
                    <div className="col-span-2 flex items-center gap-2">
                      <OtherIcons icon="home-work" className="w-[16px]" />
                      Location
                    </div>
                    <div className="col-span-3 ml-2 flex items-center">{
                      dayInfo?.roomId==1?<span>Room 105</span>:
                      dayInfo?.roomId==2?<span>Room 104</span>:
                      dayInfo?.roomId==3?<span>Room 103</span>:
                      dayInfo?.roomId==4?<span>Room 102</span>:<></>
                    }</div>
                    <div className="col-span-2 flex items-center gap-2">
                      <DeliveryTypesIcons icon="lecture" className="w-[16px]" />
                      Trainer
                    </div>
                    <div className="col-span-3 underline flex items-center">
                      <a >{learningDates?.class?.instructor?.fullName}</a>
                    </div>
                    {/* <div className="col-span-2 flex items-center  gap-2">
                      <IndicatorIcons icon="grade" className="w-[16px]" />
                      Admin
                    </div>
                    <div className="col-span-3 underline flex items-center">
                      <a>{dayInfo?.instructor?.fullName}</a>
                    </div> */}
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          } else {
            return (
              <div key={`month-calendar-${year}/${month}/${day}`} className={`font-bold flex justify-center items-center h-[25px]`}>
                <div className={dateClassName}>
                  {day}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

type MonthPropsType = {
  learningDates?: learningDate[];
  setDate?: () => Date;
};

const Month = ({ learningDates = [] }: MonthPropsType) => {
  console.log(learningDates);
  
  const currentDate = new Date();
  const [displayingMonth, setDisplayingMonth] = useState<number>(currentDate.getMonth() + 1);
  const [displayingYear, setDisplayingYear] = useState<number>(currentDate.getFullYear());
  const nextMonth = displayingMonth !== 12 ? displayingMonth + 1 : 1;
  const nextMonthYear = displayingMonth !== 12 ? displayingYear : displayingYear + 1;
  return (
    <TooltipProvider>
      <div className="shadow-[5px_10px_20px_rgba(0,0,0,0.2)] p-3 flex gap-5 rounded-lg items-start justify-center select-none">
        <MonthCalendar
          year={displayingYear}
          month={displayingMonth}
          learningDates={learningDates}
          onPrev={() => {
            setDisplayingMonth((prev) => {
              if (prev === 1) {
                setDisplayingYear(displayingYear - 1);
                return 12;
              }
              return prev - 1;
            });
          }}
        />
        <MonthCalendar
          year={nextMonthYear}
          month={nextMonth}
          learningDates={learningDates}
          onNext={() => {
            setDisplayingMonth((prev) => {
              if (prev === 12) {
                setDisplayingYear(displayingYear + 1);
                return 1;
              }
              return prev + 1;
            });
          }}
        />
      </div>
    </TooltipProvider>
  );
};

export default Month;

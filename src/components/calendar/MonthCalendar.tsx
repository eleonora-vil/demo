import { compareDate, daysOfWeek, getDaysInMonth, monthAbbreviation } from '@/utils/DateUtils';
import NavigatorIcons from '../icons/navigator-icons';
import { useState } from 'react';

type MonthCalendarPropsType = {
  highlightDates?: Date[];
  activeDates?: Date[];
  setDate?: (date: Date) => void;
};

const MonthCalendar = ({ highlightDates = [], activeDates = [], setDate, ...props }: MonthCalendarPropsType & React.HTMLAttributes<HTMLDivElement>) => {
  const prevDayElements = [];
  const today = new Date();
  const [displayingMonth, setDisplayingMonth] = useState<number>(today.getMonth() + 1);
  const [displayingYear, setDisplayingYear] = useState<number>(today.getFullYear());
  const firstDateOfMonth = new Date(displayingYear, displayingMonth - 1, 1);
  const onNextMonth = () => {
    setDisplayingMonth((prev) => {
      if (prev === 12) {
        setDisplayingYear(displayingYear + 1);
        return 1;
      }
      return prev + 1;
    });
  };
  const onPrevMonth = () => {
    setDisplayingMonth((prev) => {
      if (prev === 1) {
        setDisplayingYear(displayingYear - 1);
        return 12;
      }
      return prev - 1;
    });
  };
  for (let i = 0; i < firstDateOfMonth.getDay(); i++) {
    prevDayElements.push(<div key={`prev-month-calendar-${displayingMonth}/${displayingYear}/${i}`}></div>);
  }
  return (
    <div {...props}>
      <div className="p-5 flex flex-col justify-center items-center">
        <div className="flex mb-4 justify-between w-full">
          <div>
            <button onClick={onPrevMonth} className="shadow-[0_1px_5px_0_rgba(0,0,0,0.2)] rounded-full">
              <NavigatorIcons icon="arrow-back" />
            </button>
          </div>
          <div className="font-bold w-[220px] border-b pb-4 text-center text-lg">
            <span>{monthAbbreviation[displayingMonth - 1]} </span>
            <span>{displayingYear}</span>
          </div>
          <div>
            <button onClick={onNextMonth} className="shadow-[0_1px_5px_0_rgba(0,0,0,0.2)] rounded-full">
              <NavigatorIcons icon="arrow-forward" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-y-4 uppercase w-full">
          {daysOfWeek.map((dayOfWeek) => (
            <div className="text-center text-sm" key={`${displayingMonth}-day-of-week-${dayOfWeek}`}>
              {dayOfWeek}
            </div>
          ))}
          {prevDayElements}
          {getDaysInMonth(displayingYear, displayingMonth).map((day) => {
            const currentDate = new Date(displayingYear, displayingMonth - 1, day);
            const isActive: boolean = activeDates.some((date) => compareDate(date, currentDate));
            const isHighLight: boolean = highlightDates.some((date) => compareDate(date, currentDate));
            const isToday: boolean = compareDate(today, currentDate);

            let dateClassName = 'select-none rounded-full aspect-square w-[25px] flex justify-center items-center ';
            if (isToday) {
              dateClassName += 'bg-blue-700 text-white ';
            } else if (isActive) {
              dateClassName += 'bg-black text-white ';
            }
            if (isHighLight) {
              dateClassName += 'outline outline-offset-2 outline-blue-500 ';
            }
            return (
              <div key={`month-calendar-${displayingYear}/${displayingMonth}/${day}`} className={`font-bold flex justify-center items-center h-[25px]`}>
                {isActive && setDate ? (
                  <button
                    onClick={() => {
                      setDate(currentDate);
                    }}
                    className={dateClassName}
                  >
                    {day}
                  </button>
                ) : (
                  <div className={dateClassName}>{day}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default MonthCalendar;

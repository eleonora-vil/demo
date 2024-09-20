import { useState } from 'react';
import { monthAbbreviation, getMonthsInYear } from '@/utils/DateUtils';

type YearCalendarType = {
  year: number;
  activeMonths?: number[];
  onPrev?: () => void;
  onNext?: () => void;
};

const YearCalendar = ({ year, activeMonths = [], onPrev, onNext }: YearCalendarType) => {
  return (
    <div className="p-5 flex flex-col justify-center items-center px-10">
      <div className="flex mb-4 justify-between w-full text-lg">
        <div>
          {onPrev && (
            // <Button
            //   className="text-slate-700"
            //   type="primary"
            //   shape="circle"
            //   icon={<LeftOutlined />}
            //   onClick={onPrev}
            // />
            <>-</>
          )}
        </div>
        <div className="font-bold w-[220px] border-b pb-4 text-center ">
          <span>{year}</span>
        </div>
        <div>
          {onNext && (
            // <Button
            //   className="text-slate-700"
            //   type="primary"
            //   shape="circle"
            //   icon={<RightOutlined />}
            //   onClick={onNext}
            // />
            <>+</>
          )}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-x-10 gap-y-4 uppercase ">
        {monthAbbreviation.map((month, index) => {
          const isActive: boolean = activeMonths.includes(index);
          return (
            <div className={`text-center font-bold flex justify-center items-center p-2 ${isActive && 'bg-black text-white'}`} key={`year-calendar-${year}/${month}`}>
              {month}
            </div>
          );
        })}
      </div>
    </div>
  );
};

type YearProps = {
  activeDates: Date[];
};
const Year = ({ activeDates }: YearProps) => {
  const [displayingYear, setDisplayingYear] = useState(2024);
  const currentActiveMonths: number[] = getMonthsInYear(activeDates, displayingYear);
  const nextActiveMonths: number[] = getMonthsInYear(activeDates, displayingYear + 1);
  return (
    <div className="shadow-[5px_10px_20px_rgba(0,0,0,0.2)] p-3 flex gap-5 rounded-lg items-start justify-center select-none">
      <YearCalendar
        year={displayingYear}
        activeMonths={currentActiveMonths}
        onPrev={() => {
          setDisplayingYear(displayingYear - 1);
        }}
      />
      <YearCalendar
        year={displayingYear + 1}
        activeMonths={nextActiveMonths}
        onNext={() => {
          setDisplayingYear(displayingYear + 1);
        }}
      />
    </div>
  );
};

export default Year;

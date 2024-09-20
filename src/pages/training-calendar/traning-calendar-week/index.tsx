import CalendarHeader from './component/CalendarHeader';
import CalendarBody from './component/CalendarBody';
import { useState } from 'react';
import { getSundayOfCurrentWeek } from '@/utils/DateUtils';

const TrainingCalendarWeek = () => {
  const [displayDate, setDisplayDate] = useState(getSundayOfCurrentWeek().toDateString());

  return (
    <div className='w-full'>
      <CalendarHeader displayDate={displayDate} setDisplayDate={setDisplayDate} />
      <CalendarBody displayDate={displayDate} />
    </div>
  );
};

export default TrainingCalendarWeek;

import { TabsButton } from './TabsButton';
import { Tab } from '@/types/tab';
import CalendarDay from './calendarDay';
import CalendarWeek from './calendarWeek';
export default function ButtonCalendar() {
  const tabs: Tab[] = [
    {
      label: 'Day',
      content: <CalendarDay />,
    },
    {
      label: 'Week',
      content: <CalendarWeek />,
    },
  ];
  return (
    <div>
      <div className="px-5 w-[80vw] mt-5">
        <TabsButton tabs={tabs} />
      </div>
    </div>
  );
}

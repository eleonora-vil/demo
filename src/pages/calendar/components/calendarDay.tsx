import * as React from 'react';
import MonthCalendar from '@/components/calendar/MonthCalendar';
import { DAY_EVENT } from '@/constants/events';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { compareDate } from '@/utils/DateUtils';
import { useAppSelector } from '@/hooks/useRedux';

interface Event {
  start: string;
  // end: string;
  title: string;
}


export default function CalendarDay() {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const TRAINING_EVENTS = useAppSelector(state => state.user.schedule);
  const eventsForSelectedDate: Event[] = TRAINING_EVENTS.filter((event: Event) => compareDate(new Date(event.start), selectedDate));
  const activeDates = TRAINING_EVENTS.map((event: any) => {
    return new Date(event.start);
  });
  const getEventsByTime = (time: string): Event[] => {
    return eventsForSelectedDate.filter((event: Event) => {
      const eventStartTime = new Date(event.start);
      const eventHour = eventStartTime.getHours();
      if (time === 'Morning' && eventHour >= 0 && eventHour < 13) {
        return true;
      }
      if (time === 'Afternoon' && eventHour >= 13 && eventHour < 18) {
        return true;
      }
      if (time === 'Night' && (eventHour >= 18 || eventHour < 8)) {
        return true;
      }
      return false;
    });
  };

  return (
    <div className="flex justify-center py-5 gap-5">
      <div className="flex-[0.7] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.5)] overflow-hidden rounded-lg">
        <MonthCalendar setDate={setSelectedDate} activeDates={activeDates} highlightDates={[selectedDate]} />
      </div>
      <div className="bg-slate-40 flex-1">
        <Accordion type="single" collapsible>
          {DAY_EVENT.map((item, index) => {
            const eventsByTime = getEventsByTime(item.type).sort((a: Event, b: Event) => new Date(a.start).getTime() - new Date(b.start).getTime());
            return (
              <AccordionItem value={index.toString()} key={index}>
                <AccordionTrigger className="bg-primary text px-4 py-2 text-white rounded-xl">
                  <div className="flex gap-2 flex-1 pe-16">
                    <span className="text-left font-bold">{item.type}</span>
                    <span className="ms-5 text-left">
                      ({item.start} - {item.end})
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="divide-y space-y-3">
                  {[
                    parseInt(item.start.substring(0, 2)),
                    parseInt(item.start.substring(0, 2)) + 1,
                    parseInt(item.start.substring(0, 2)) + 2,
                    parseInt(item.start.substring(0, 2)) + 3,
                  ].map((hour) => {
                    return (
                      <div className="p-3 flex flex-wrap gap-2" key={`calendar-hour-${hour}`}>
                        {eventsByTime.map((event, index) => {
                          const eventHour = new Date(event.start).getHours();
                          if (eventHour == hour)
                            return (
                              <div className="bg-primary w-[300px] text-white rounded-xl p-3" key={index}>
                                {event.title}
                              </div>
                            );
                        })}
                      </div>
                    );
                  })}

                  {/* {eventsByTime.map((event, innerIndex) => (
                    <div
                      className="bg-primary w-[20vw] text-white rounded-xl p-3"
                      key={innerIndex}
                    >
                      {event.title}
                    </div>
                  ))} */}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}

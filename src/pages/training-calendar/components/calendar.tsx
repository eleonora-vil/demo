import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { TRAINING_EVENTS } from '@/constants/events';

export default function Calendar() {
  return (
    <div className="w-full p-2">
      <FullCalendar
        plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        }}
        events={TRAINING_EVENTS}
        aspectRatio={2.8}
        slotMinTime={'04:00:00'}
        slotMaxTime={'22:00:00'}
        expandRows={true}
        fixedWeekCount={false}
        displayEventEnd={true}
        nowIndicator={true}
        editable={true}
        droppable={true}
        selectable={true}
        selectMirror={true}
        selectOverlap={true}
      />
    </div>
  );
}

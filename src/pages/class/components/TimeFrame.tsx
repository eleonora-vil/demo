import React from 'react';
import Collapse from './Collapse';
import NavigationIcons from '@/components/icons/navigation-icons';
import Month from '@/components/calendar/Month';
import { learningDates } from '@/pages/class-detail/data/data';

const TimeFrame = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <Collapse icon={<NavigationIcons icon={'calendar-today'} />} title="Time frame" description="25-Apr-22 to 21-July-22" {...props}>
      <Month learningDates={learningDates} />
    </Collapse>
  );
};

export default TimeFrame;

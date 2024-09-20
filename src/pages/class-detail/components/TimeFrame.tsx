import Month from '@/components/calendar/Month';
import NavigationIcons from '@/components/icons/navigation-icons';
import React from 'react';
import Collapse from './Collapse';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TimeFrame = ({ ...props }: React.HTMLAttributes<HTMLDivElement> | any) => {
  console.log(props.data);
  
  return (
    <Collapse icon={<NavigationIcons icon={'calendar-today'} />} title="Time frame" description="" {...props}>
      <Month learningDates={props.data} />
    </Collapse>
  );
};

export default TimeFrame;

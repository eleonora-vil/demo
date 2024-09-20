import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { addSelectedAttendees, removeSelectedAttendees } from '@/lib/redux/attendeeListSlice';
import { User } from '@/types/user';
import React from 'react';

interface AttendeeCardProps {
  user?: User;
}

export default function AttendeeCard({ user }: AttendeeCardProps) {
  const dispatch = useAppDispatch();
  const { slectedAttendees } = useAppSelector((state) => state.addTrainee);
  const isChecked = slectedAttendees.includes(user?.userId as number);

  const handleChange = () => {
    if (!isChecked) {
      dispatch(addSelectedAttendees(user?.userId as number));
    } else {
      dispatch(removeSelectedAttendees(user?.userId as number));
    }
  };

  return (
    <div className="gap-2 w-full py-2 my-1 bg-muted px-4 rounded-md grid grid-cols-12 items-center">
      <div className="col-span-1">
        <input type="checkbox" onClick={handleChange} checked={isChecked} className="cursor-pointer size-4" />
      </div>
      <div className="col-span-2">
        <Avatar>
          <AvatarImage src={user?.avatar || `https://avatar.iran.liara.run/public/boy?username=${user?.fullName}`} />
        </Avatar>
      </div>
      <div className="col-span-4 shrink-0 truncate">{user?.fullName}</div>
      <div className="col-span-5 truncate">{user?.email}</div>
    </div>
  );
}

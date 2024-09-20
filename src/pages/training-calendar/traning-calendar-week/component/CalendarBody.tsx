import { useAppSelector } from '@/hooks/useRedux';
import { axiosClient } from '@/lib/api/config/axios-client';
import { handleApiError } from '@/lib/api/syllabus-detail-api';
import { useEffect, useState } from 'react';
import CalendarPeriod from './CalendarPeriod';

type CalendarBodyProps = {
  displayDate: string;
};
const CalendarBody = ({ displayDate }: CalendarBodyProps) => {
  const [data, setData] = useState<any>()
  const user = useAppSelector((store) => store.currentUser.user);
  console.log(user);
  
  const [morning, setMorning] = useState<any>([]);
  const [afternoon, setAfternoon] = useState<any>([]);
  const [evening, setEvening] = useState<any>([]);


  const getData = async (startDay: Date, endDay: Date) => {
    try {
      const result = await axiosClient.get(`/api/ViewTrainingCalendar/View-Training-Calendar?startDay=${startDay.toISOString()}&endDate=${endDay.toISOString()}&userID=${user.userId}`)
      console.log(result.data.result.viewTrainingCalendarModel);
      setData(result.data.result.viewTrainingCalendarModel)
    } catch (error) {
      return handleApiError(error)
    }
  }
  useEffect(() => {
    try {
      const startDay = new Date(displayDate)
      const endDay = new Date(new Date(displayDate).setDate(new Date(displayDate).getDate() + 7))

      console.log(endDay.toISOString());
      setMorning([])
      setAfternoon([])
      setEvening([])
      getData(startDay, endDay)
    } catch (error) {
      console.log(error);

    }
  }, [displayDate])
  // let data = [
  //   {
  //     id: '1',
  //     date: '2024-03-13T18:26:38.766Z',
  //     title: 'HCM22_FR.BA_02',
  //   },
  //   {
  //     id: '2',
  //     date: '2024-03-17T11:35:59.389Z',
  //     title: 'HN22_FR.BA_02',
  //   },
  //   {
  //     id: '3',
  //     date: '2024-03-05T18:18:45.930Z',
  //     title: 'HCM22_FR.O_DevOps_02',
  //   },
  //   {
  //     id: '4',
  //     date: '2024-04-12T08:39:27.709Z',
  //     title: 'HCM22_FR.BA_01',
  //   },
  //   {
  //     id: '5',
  //     date: '2024-03-28T22:17:16.219Z',
  //     title: 'HN22_FR.BA_01',
  //   },
  //   {
  //     id: '6',
  //     date: '2024-03-17T04:03:14.569Z',
  //     title: 'DN22_FR.BA_02',
  //   },
  //   {
  //     id: '7',
  //     date: '2024-03-02T11:26:31.797Z',
  //     title: 'DN22_FR.BA_02',
  //   },
  // ];
  // data = data.filter((event) => {
  //   return isDateInRange(new Date(event.date), new Date(displayDate), new Date(getNext7Days(new Date(displayDate))));
  // });


  useEffect(() => {

    if (data?.length > 0) {
      data?.forEach((item: any, index: number) => {
        console.log(item.classTimes);

        item.classTimes.forEach((value: any, number: number) => {
          if (value.time == 0) {
            setMorning([{ classes: value, day: item.day }])
          }
          else if (value.time == 1) {
            setAfternoon([{ classes: value, day: item.day }])
          }
          else {
            setEvening([{ classes: value, day: item.day }])
          }
        })

      });
    }
  }, [data])
  console.log("morning", morning, "afternoon", afternoon, "evening", evening);

  const periodHeaderStyle = 'w-full bg-primary text-white py-2 px-4 rounded-xl flex gap-5';
  return (
    <div>
      <div className={periodHeaderStyle}>
        <strong>Morning</strong> (8:00 to 12:00)
      </div>
      <CalendarPeriod data={morning} />
      <div className={periodHeaderStyle}>
        <strong>Afternoon</strong> (13:00 to 17:00)
      </div>
      <CalendarPeriod data={afternoon} />
      <div className={periodHeaderStyle}>
        <strong>Evening</strong> (18:00 to 22:00)
      </div>
      <CalendarPeriod data={evening} />
    </div>
  );
};

export default CalendarBody;

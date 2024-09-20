import TitleBanner from '@/components/title-banner';
import ButtonCalendar from './components/Button';
import { useEffect, useState } from 'react';
import { getUserTrainingCalendar } from '@/lib/api/user-api';
import { useAppSelector } from '@/hooks/useRedux';
import { useDispatch } from 'react-redux';
import { setSchedule } from '@/lib/redux/userSlice';
import Loading from '@/components/loading';
export function TrainingCalendarView() {
  const user = useAppSelector(state => state.currentUser.user);
  const schedule = useAppSelector(state => state.user.schedule);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Training Calendar - FAMS"
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data, error } = await getUserTrainingCalendar(user.userId);
      if (!error) {
        const compatibleData = extractClasses(data.result.viewTrainingCalendarModel);
        console.log(compatibleData);
        dispatch(setSchedule(compatibleData));
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 500)
    }
    fetchData();
  }, []);

  function extractClasses(data: any) {
    const classesArray = [];

    for (const item of data) {
      const day = new Date(item.day);
      const classTimes = item.classTimes;
      for (const classTime of classTimes) {
        const { time, classes } = classTime;
        if (time == 0) {
          day.setHours(9)
        } else if (time == 1) {
          day.setHours(13)
        } else {
          day.setHours(19)
        }
        for (const classItem of classes) {
          const { className } = classItem;
          classesArray.push({
            title: className,
            start: day.toISOString(),
          });
        }
      }
    }
    return classesArray;
  }

  if (isLoading) {
    return <Loading />
  }
  if (!isLoading && !schedule) {
    return (
      <div>
        <h1 className='text-xl font-bold p-5 text-center mt-[20%]'>
          You have no schedule
        </h1>
      </div>
    )
  } else
    return (
      <main className="space-y-2 h-[100vh]">
        <TitleBanner title={'Training Calendar'} />
        <div className="flex justify-between gap-1">
          <ButtonCalendar />
        </div>
      </main>
    );
}

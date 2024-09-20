import { SyllabusTabs } from '@/components/syllabus-tab';
import { useParams } from 'react-router-dom';
import AttendeeList from './components/AttendeeList';
import Budget from './components/Budget';
import General from './components/General';
import Header from './components/Header';
import Others from './components/Others';
import TimeFrame from './components/TimeFrame';
import TrainingProgram from './components/TrainingProgram';
import { useEffect, useState } from 'react';
import { getClassDetail, getSchedule } from '@/lib/api/class-api';
import { useDispatch } from 'react-redux';
import { setClassDetail, setHasSchedule } from '@/lib/redux/classDetailSlice';
import Loading from '@/components/loading';
import ErrorServerPage from '@/server-Error/errorServer';
import { useAppSelector } from '@/hooks/useRedux';

const ClassDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false)
  const dispatch = useDispatch();
  const id = useParams().classID;
  const [timeData, setTimeData] = useState([]);
  const classDetail = useAppSelector(state => state.classDetail.classDetail);

  //GET DETAIL
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const { data } = await getClassDetail(id);
        // console.log(JSON.stringify(data));
        if (JSON.stringify(data) == "null") {
          setIsError(true)
          // setIsLoading(false)
        }
        else {
          setTimeData(data.result)
          dispatch(setClassDetail(data.result.class));
        }
        setIsLoading(false)
      }
      setIsLoading(false);
    }
    fetchData();
  }, [])

  //CHECK CLASS SCHEDULE
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const {  error } = await getSchedule(id);
        
        
        if (error) {
          dispatch(setHasSchedule(false));
        } else {
          dispatch(setHasSchedule(true));
        }
        setIsLoading(false)
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  //SET DOCUMENT TITLE
  useEffect(() => {
    if (classDetail) {
      document.title = `${classDetail.className} - FAMS`
    } else {
      document.title = `FAMS`
    }
  }, [classDetail]);

  if (isLoading) return <Loading />
  return (
    <div>
      {isError ? <ErrorServerPage /> : <><Header />
        <div className="p-3">
          <div className="grid-cols-3 grid gap-3 mb-5 ">
            <div className="xl:col-span-1 col-span-3 flex flex-col gap-3">
              <General id={id} />
            </div>
            <div className="xl:col-span-2 col-span-3">
              {Object.keys(timeData).length > 0 ? <TimeFrame data={timeData} /> : <></>}
            </div>
          </div>
          <SyllabusTabs
            tabs={[
              {
                label: 'Training Program',
                content: <TrainingProgram id={id} />,
              },
              {
                label: 'Attendee List',
                content: <AttendeeList />,
              },
              {
                label: 'Budget',
                content: <Budget />,
              },
              {
                label: 'Others',
                content: <Others />,
              },
            ]}
          />
        </div></>}
    </div>
  );
};

export default ClassDetail;

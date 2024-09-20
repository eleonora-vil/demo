import ActionIcons from '@/components/icons/action-icons';
import DocumentManageIcons from '@/components/icons/document-manage-icons';
import Typography from '@/components/Typography';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAppSelector } from '@/hooks/useRedux';
import { CalendarCheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Header = () => {
  const [duration, setDuration] = useState(0);
  const classDetail = useAppSelector(state => state.classDetail.classDetail);
  const hasSchedule = useAppSelector(state => state.classDetail.hasSchedule);
  const { classID } = useParams()
  console.log(classDetail);
  useEffect(() => {
    if (classDetail && Object.keys(classDetail).length > 0) {
      calculateTime(new Date(classDetail?.semester?.semesterStartDate), new Date(classDetail?.semester?.semesterEndDate));
    }
  }, [classDetail]);
  const calculateTime = (startDate: Date, endDate: Date) => {
    const minute = endDate.getTime() - startDate.getTime();
    const time = minute / 1000 / 3600 / 24;

    setDuration(time);
  };

  return (
    <div>
      <div className='px-5'>
        <Typography type="h3" className='mt-5'>Class</Typography>
        <div className="flex justify-between">
          <div className="border-b-white border-b pb-2 ">
            <div className="flex flex-row  items-baseline gap-5">
              <Typography type="h1">{classDetail?.className}</Typography>
              <Badge>{classDetail?.status}</Badge>
            </div>
          </div>
          <div className="flex-1 flex justify-end">
            <div className="flex items-center">
              <Popover >
                <PopoverTrigger asChild>
                  <button className="w-10 h-10 rounded-full">
                    <ActionIcons icon="more-horizontal" className="w-10 h-10" />
                  </button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-lg border-b border-b-slate-300 pb-1">Manage</h3>
                    <Link to={`/class/${classID}/edit`}>
                      <button className="p-3 hover:bg-slate-300 text-left flex gap-5 w-full">
                        <DocumentManageIcons icon="create" />
                        Edit class
                      </button>
                    </Link>
                    {
                      !hasSchedule &&
                      <Link to={`/class/${classID}/create-schedule`}>
                        <button className="p-3 hover:bg-slate-300 text-left flex gap-5 w-full">
                          <CalendarCheckIcon />
                          Create class schedule
                        </button>
                      </Link>
                    }
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>


      <div className="flex py-3 px-5 gap-3 items-center border-t border-b border-t-black border-b-black">
        <div className="border-r border-r-white pr-6">
          <span className="text-h4">{duration}</span> days <span className="ml-1 italic">({duration * 4} hours)</span>
        </div>
        {/* <DeliveryTypes deliveryType="lab" />
        <DeliveryTypes deliveryType="lecture" />
        <DeliveryTypes deliveryType="exam" />
        <DeliveryTypes deliveryType="workshop" />
        <DeliveryTypes deliveryType="review" /> */}
      </div>
    </div>
  );
};

export default Header;

import IndicatorIcons from '@/components/icons/indicator-icons';
import Collapse from './Collapse';
import { useEffect, useState } from 'react';
import { axiosClient } from '@/lib/api/config/axios-client';
import { handleApiError } from '@/lib/api/role-api';

const Attendee = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const [detailData, setDetailData] = useState([]);
  const getDetail = async () => {
    try {
      const result = await axiosClient.get(`/api/Class/Detail/${props.id}`);
      console.log(result);

      setDetailData(result.data.result.attendees);
    } catch (error) {
      return handleApiError(error);
    }
  };
  useEffect(() => {
    getDetail();
  }, []);
  return (
    <Collapse icon={<IndicatorIcons icon="grade" />} title="Attendee" description="Fresher" {...props}>
      <div className="grid grid-cols-3 rounded-xl overflow-hidden">
        <div className="bg-primary p-5 border border-white flex flex-col items-center justify-between text-white gap-3">
          <div className="font-bold">Planned</div>
          <div className="text-4xl">{detailData && '0'}</div>
        </div>
        <div className="bg-blue-800 p-5 border border-white flex flex-col items-center justify-between text-white gap-3">
          <div className="font-bold">Accepted</div>
          <div className="text-4xl">{detailData && '0'}</div>
        </div>
        <div className="bg-secondary p-5 border-white flex flex-col items-center justify-between gap-3">
          <div className="font-bold">Actual</div>
          <div className="text-4xl">{detailData && '0'}</div>
        </div>
      </div>
    </Collapse>
  );
};

export default Attendee;

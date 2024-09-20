/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from '@/lib/api/config/axios-client';
import { handleApiError } from '@/lib/api/role-api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TrainingProgramCard from './TrainingProgramCard';
// interface Course {
//   syllabusName: string;
//   syllabusShortName: string;

//   syllabusStatus: string;
//   createdAt: string;
//   createdBy: string;
// }
const TrainingProgram = ({ id }: any) => {
  const [detailData, setDetailData] = useState<any>([]);
  const [data, setData] = useState<any>();
  const getProgramDetail = async ({ programId }: any) => {
    try {
      const programResult = await axiosClient.get(`/api/TrainingProgram/getDetails/${programId}`);
      setDetailData(programResult.data.result);
    } catch (error) {
      return handleApiError(error);
    }
  };
  const getDetail = async () => {
    try {
      const result = await axiosClient.get(`/api/Class/Detail/${id}`);
      setData(result.data.result);
    } catch (error) {
      return handleApiError(error);
    }
  };
  useEffect(() => {
    getDetail();
  }, []);
  useEffect(() => {
    if (data?.class) {
      getProgramDetail(data?.class);
    }
  }, [data]);
  const navigator = useNavigate();
  return (
    <div className="w-full">
      <div className="bg-primary text-white px-10 py-5 mb-3">
        <h2 className="text-3xl mb-2 hover:underline cursor-pointer" onClick={() => navigator(`/training-program/${data?.class?.programId}`)}>
          {detailData.programName}
        </h2>
        <div className="flex">
          <div className='flex flex-row'>
              v<span>{data?.class?.program?.version}</span> <div className="border  mx-4 h-5" />  <div>Modified by <span className="font-bold">{detailData?.createBy}</span></div>
          </div>
        </div>
      </div>
      <div className="m-5"><hr/></div>
      <div className="flex flex-col gap-5">
        {detailData?.listSyllabus?.map((course: any, index: any) => (
          <TrainingProgramCard
            key={`traning-program-card-${index}`}
            syllabusName={course.name || 'No Name'}
            syllabusShortName={course.code}
            syllabusStatus={course.status}
            createdAt={new Date(course.createdDate)}
            version={course.version}
          />
        ))}
      </div>
      <div className="p-3 bg-primary mt-3 rounded-b-xl"></div>
    </div>
  );
};

export default TrainingProgram;

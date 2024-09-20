import { getSyllabusDetailById } from '@/lib/api/syllabus-detail-api';
import { useEffect, useState } from 'react';
import { useAppDispatch } from './useRedux';
import { set, setAssessmentScheme, setCreateTrainingProgramUnits } from '@/lib/redux/syllabusDetailsSlice';
import { toast } from 'react-toastify';
import { convertCallGetIntoRedux } from '@/utils/syllabus-convert-utils';

const useGetSyllabusDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [syllabusDetails, setSyllabusDetails] = useState();
  const dispatch = useAppDispatch();

  const getSyllabusDetails = async (id: string) => {
    setIsLoading(true);
    try {
      const {data} = await getSyllabusDetailById(id);
      if (data?.result?.getSyllabusResponse && Object.keys(data?.result?.getSyllabusResponse).length === 0) {
        dispatch(set(undefined));
      } else {
     
       

        
        dispatch(set(data?.result?.getSyllabusResponse));
        setSyllabusDetails(data?.result?.getSyllabusResponse);
        dispatch(setCreateTrainingProgramUnits(convertCallGetIntoRedux(data?.result?.getSyllabusResponse)));
        dispatch(setAssessmentScheme(data?.result?.getSyllabusResponse?.assessmentSchemeSyllabus));
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, syllabusDetails, getSyllabusDetails };
};

export default useGetSyllabusDetails;

import Typography from '@/components/Typography';
import { axiosClient } from '@/lib/api/config/axios-client';
import { handleApiError } from '@/lib/api/role-api';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ViewItem from './ViewItem';
import ErrorPage from '@/pages/error-page';
import { Badge } from '@/components/ui/badge';
import Loading from '@/components/loading';
import MoreHorizontalIcon from '@/assets/icons/action-icons/MoreHorizontalIcon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DocumentManageIcons from '@/components/icons/document-manage-icons';
import ShowTextEditor from '@/components/tiptap/ShowTextEditor';
import { formatDate } from '@/utils/DateUtils';


const ViewTrainingProgram = () => {
  const idProgram = useParams().id;
  const [programDetail, setProgramDetail] = useState<any>();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    getDetail();
  }, []);
  const getDetail = async () => {
    try {
      const result = await axiosClient.get(`/api/TrainingProgram/getDetails/${idProgram}`);
      setProgramDetail(result.data.result);
    } catch (error) {
      console.log(error);
      setError(true);
      return handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleEdit = () => {
    navigate(`/training-program/${idProgram}/edit`);
  }

  useEffect(() => {
    if (programDetail) {
      document.title = `${programDetail?.programName} - FAMS`
    } else {
      document.title = `FAMS`
    }
  }, [programDetail])

  if (isLoading) return <Loading />

  return (
    <div>
      {error == true ? (
        <ErrorPage />
      ) : (
        <main>
          <div className='px-5'>
            <Typography type="h3">
              Training Program
            </Typography>
            <div className="flex justify-between">

              <div className='flex flex-row items-center gap-5'>
                <Typography type='h1' className="max-w-[600px] overflow-clip">{programDetail?.programName}</Typography>
                <Badge  className="py-1" >{programDetail?.status}</Badge>
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger className='p-3 rounded-full'>
                    <MoreHorizontalIcon />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Training Program</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='flex gap-2 items-center cursor-pointer' onClick={handleEdit}>
                      <DocumentManageIcons icon='create' />
                      Edit Training Program
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

            </div>
          </div>
          <Typography type="p" className=" border-t border-b border-t-black border-b-black py-3 px-5 italic">
            Modified by {programDetail?.createBy}  {programDetail?.lastModifiedDate?<span>on {formatDate(new Date(programDetail?.lastModifiedDate))}</span>:<></>}
            {/* Create by {programDetail?.createBy} */}
          </Typography>
          <div className='px-5'>
            <Typography type="h3">Description</Typography>
            <p className='py-2'>
              <ShowTextEditor content={programDetail?.description} />
            </p>

            {/* <p className='py-2 text-gray-600'>{programDetail?.description}</p> */}
            <Typography type="h3">
              Content
            </Typography>
            <div className='p-3'>

              {
                programDetail?.listSyllabus.length > 0 ? programDetail?.listSyllabus.map((item:any, index: number) => <ViewItem syllabusDetail={item} key={`syllabus-item-${index}`} />) : "No syllabus"
              }
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default ViewTrainingProgram;

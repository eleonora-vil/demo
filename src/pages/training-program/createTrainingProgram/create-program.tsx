import Typography from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { axiosClient } from '@/lib/api/config/axios-client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SearchBar from './components/SearchBar';
import TitleBanner from '@/components/title-banner';
import { formatDate } from '@/utils/DateUtils';
import { useAppSelector } from '@/hooks/useRedux';
import EditTextEditor from '@/components/tiptap/EditTextEditor';

export default function CreateProgram() {
  const [syllabusId, setSyllabusId] = useState([]);
  const [description, setDescription] = useState('');
  const [programName, setProgramName] = useState('');
  const user = useAppSelector(state => state.currentUser.user);
  const navigator = useNavigate();
  const submitForm = async () => {

    console.log('vao submitForm');
    const newList = syllabusId.map((item: any) => item?.syllabusId);
    console.log(newList);
    
    if (programName.trim().length <= 0) {
      return toast.error('Missing Name', {
        position: 'top-left',
      });
    }
    if (description.trim().length <= 0) {
      return toast.error('Missing description', {
        position: 'top-left',
      });
    }
    if(newList.length<=0){
      return toast.info('Choose 1 syllabus at least')
    }

    try {
      const result = await axiosClient.post('/api/TrainingProgram/Create', {
        programName: programName,
        description: description,
        syllabusID: newList,
      });

      if (result) {
        console.log('success', result);
        toast.success('Create Success', {
          position: 'top-right',
        });

        // navigator (`/training-program/${result?.data?.result?.program?.programId}/edit`);
        navigator(`/training-program`);
      }
    } catch (error: any) {
      const code = error.response.status;

      if (code == 403) {
        error.response.data = 'You do not have permission';
      } else if (code == 500) {
        error.response.data = 'Server have problems';
      }

      return toast.error(`${error.response.data}`, {
        position: 'top-left',
      });
    }
  };
  useEffect(() => {
    document.title = `Create Training Program - FAMS`
  }, [])
  return (
    <div className="space-y-2 pb-12 ">
      <div>
        <TitleBanner title="Create Training Program" />
      </div>
      <Typography type="p" className=" border-t border-b border-t-black border-b-black py-3 px-5 italic">
        Created on {formatDate(new Date())} by {user.fullName}
        {/* Create by {programDetail?.createBy} */}
      </Typography>
      {/* body */}
      <div className='p-5'>
        <Typography type="h2" className='col-span-3'>Content</Typography>
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-3 font-semibold">Training Program Name</div>
          <Input className="bg-slate-100 col-span-9" type="text" value={programName} onChange={(e: any) => setProgramName(e.target.value)}></Input>
          <div className='col-span-3  font-semibold'>Description</div>
          <div className="col-span-9 h-[300px] border p-3 rounded-md">
            <EditTextEditor content={description} handleUpdate={(string: string) => setDescription(string)} />
          </div>
          {/* <Input className="col-span-9 h-32 bg-slate-100" type="text" value={description} onChange={(e: any) => setDescription(e.target.value)}></Input> */}
          <div className="col-span-3  font-semibold">Select Syllabus</div>
          <div className="col-span-9">
            <SearchBar method={setSyllabusId} />
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <Button className="ml-10 w-[97px] h-9 px-[25px] py-0.5 bg-gray-700 rounded-lg shadow justify-center items-center gap-[5px] flex" onClick={() => submitForm()}>
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}

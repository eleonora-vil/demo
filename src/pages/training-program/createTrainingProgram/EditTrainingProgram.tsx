import EditTextEditor from '@/components/tiptap/EditTextEditor';
import TitleBanner from '@/components/title-banner';
import Typography from '@/components/Typography';
import { Input } from '@/components/ui/input';
import { useAppSelector } from '@/hooks/useRedux';
import { axiosClient } from '@/lib/api/config/axios-client';
import { handleApiError } from '@/lib/api/role-api';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ButtonCompose from './components/ButtonCompose';
import SearchBar from './components/SearchBar';
const EditTrainingProgram = () => {
  const programID = useParams().id;
  const navigator = useNavigate();

  console.log(programID);
  const [programItem, setProgramItem] = useState<any>([]);
  
  const user = useAppSelector((store) => store.currentUser.user);
  
  useEffect(() => {
    getDetailProgram();
  }, []);
  const getDetailProgram = async () => {
    try {
      const result = await axiosClient.get(`/api/TrainingProgram/getDetails/${programID}`);
      console.log('result in get detail training program ', result);
      setProgramItem(result.data.result);
    } catch (error) {
      return handleApiError(error);
    }
  };

  console.log(programItem);

  const [syllabusId, setSyllabusId] = useState([]);
  const [programName, setProgramName] = useState<any>('');
  const [description, setDescription] = useState<any>('');
  useEffect(() => {
    setProgramName(programItem?.programName);
    setDescription(programItem?.description);
    setSyllabusId(programItem?.listSyllabus);
  }, [programItem]);
  // const getDuration = (list: any) => {
  //   let result = "";
  //   console.log(list);
  //   let count = 0;
  //   list.forEach((element: any) => {
  //     const time =
  //       (new Date(element?.createdDate).getTime() as any) -
  //       (new Date(element?.updatedDate).getTime() as any);
  //     count = count + time;
  //   });
  //   const hours = Math.floor(count / 3600);
  //   count = count - hours * 3600;
  //   const minutes = Math.floor(count / 60);
  //   const seconds = count - minutes * 60;
  //   console.log(hours);

  //   console.log(minutes);
  //   console.log(seconds);

  //   result = `${hours} hours,${minutes} minutes,${seconds} seconds`;
  //   console.log(result);
  // };
  const setSyllabusList = () => {
    const result = syllabusId.map((item: any) => item?.syllabusId);
    return result;
  };
  const submitForm = async () => {
    try {
      // getDuration(syllabusId);
      const listSyllabusId = setSyllabusList();
      const startDate = new Date();
      const endDate = new Date();
      if(listSyllabusId.length <=0){
        toast.info('Must have one syllabus')
        return;
      }
      endDate.setDate(startDate.getDate() + 1);
      const result = await axiosClient.put(`/api/TrainingProgram/UpdateTrainingProgram`, {
        syllabusIds: listSyllabusId ,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        programId: Number(programID),
        ProgramName: programName,
        GeneralInformation: description,
        lastUpdatedBy:user.fullName,
        lastModifiedDate:new Date().toISOString()
      });
      console.log(result);
      toast.success('Success', { position: 'top-left' });
      navigator('/training-program');
    } catch (error: any) {
      console.log(error);

      const errorCode = error.response.status;
      
      
      if (errorCode == 403) {
        error.response.data = 'You do not have permission';
      } else if (errorCode == 500) {
        error.response.data = 'Server is broken';
      }
      
      
      toast.error(`${error.response.data?.result?.message|| error.response.data}`, {
        position: 'top-left',
      });
    }
  };
  useEffect(() => {
    if (programName) {
      document.title = `Edit ${programName} - FAMS`
    } else {
      document.title = `FAMS`
    }
  }, [programName])

  return (
    <div className="space-y-2 pb-12 ">
      <div>
        <TitleBanner title="Edit Training Program" component={[<ButtonCompose submitForm={submitForm} />]} />
      </div>
      <Typography type="p" className=" border-t border-b border-t-black border-b-black py-3 px-5 italic">
        Modified on {user.fullName}
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
            {description && (
              <EditTextEditor content={description} handleUpdate={(string: string) => setDescription(string)} />
            )} 
          </div>
          {/* <Input className="col-span-9 h-32 bg-slate-100" type="text" value={description} onChange={(e: any) => setDescription(e.target.value)}></Input> */}
          <div className="col-span-3  font-semibold">Select Syllabus</div>
          <div className="col-span-9">
            <SearchBar method={setSyllabusId} id={programID} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTrainingProgram;

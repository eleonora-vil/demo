import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { addTraineeToClass } from '@/lib/api/traineeInClass';
import { getAllTrainee } from '@/lib/redux/attendeeListSlice';
import { updateReRenderFunction } from '@/lib/redux/dataTableSlice';
import AttendeeCard from '@/pages/class-detail/components/AttendeeCard';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AttendeeSelectList() {
  const dispatch = useAppDispatch();
  const { allUser, slectedAttendees } = useAppSelector((state) => state.addTrainee);
  const { classDetail } = useAppSelector((state) => state.classDetail);
  const [isLoading, setIsLoading] = React.useState(false); 
  const navigate=useNavigate()
  const handleAdd = async () => {
    setIsLoading(true);
    const data = slectedAttendees.map((userId) => ({
      classId: classDetail?.classId,
      traineeId: userId,
      enrollmentDate: new Date(),
      status: 'active',
      grade: 0,
    }));
    Promise.all(data.map((item) => addTraineeToClass(item))).then((res) => {
      console.log(res[0].message);
      console.log(res[0].success);
      
      if (res[0].success == true) {
        setIsLoading(false);
       
        dispatch(updateReRenderFunction());
         toast.success('Add data Successfully !', {
          position: 'top-left',
        });
         navigate(`/class/${classDetail?.classId}`);
      } else {
        setIsLoading(false);
       
       
         toast.success('Add data Unsuccessfully !', {
          position: 'top-left',
        });
      }

    });
  };

  useEffect(() => {
    dispatch(getAllTrainee());
  }, []);

  return (
    <div>
      <ul className="max-h-[500px] overflow-y-scroll">
        {allUser.map((user) => (
          <AttendeeCard key={user.userId} user={user} />
        ))}
      </ul>
      <div className="w-full flex justify-end items-center gap-4 mt-4">
        <p className="h-full flex items-center">Selected: {slectedAttendees.length}</p>
        <Button onClick={handleAdd} disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add'}
        </Button>
      </div>
    </div>
  );
}

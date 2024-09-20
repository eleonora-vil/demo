/* eslint-disable @typescript-eslint/no-explicit-any */
import DeliveryTypesIcons from '@/components/icons/delivery-types-icons';
import IndicatorIcons from '@/components/icons/indicator-icons';
import NavigationIcons from '@/components/icons/navigation-icons';
import OtherIcons from '@/components/icons/other-icons';
import { axiosClient } from '@/lib/api/config/axios-client';
import { handleApiError } from '@/lib/api/role-api';
import { formatDate } from '@/utils/DateUtils';
import React, { useEffect, useState } from 'react';
import Collapse from './Collapse';
import { useDispatch } from 'react-redux';
import { setRooms } from '@/lib/redux/roomSlice';
import { getAllRooms } from '@/lib/api/room-api';
import Loading from '@/components/loading';
import { useAppSelector } from '@/hooks/useRedux';
import { getUserById } from '@/lib/api/user-api';
const General = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  type TrainingProgramUnitType = {
    description: string;
    syllabusId: number;
    time: number;
    unitId: number;
    unitName: string;
  }
  type RoomType = {
    roomId: number;
    name: number;
    description: string;
  }
  type ClassDetailType = {
    id: number;
    trainingProgramUnit: TrainingProgramUnitType;
    trainingProgramUnitId: number;
    day: string;
    roomId: number;
    slot: number;
    trainerId: number;
  }
  const [detailData, setDetailData] = useState<any>([]);
  const [instructorName, setInstructorName] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredRoomList, setFilteredRoomList] = useState<any[]>([]);
  const [trainerList, setTrainerList] = useState<any[]>([]);
  const rooms = useAppSelector(state => state.room.rooms);
  const dispatch = useDispatch();

  const filterRoomList = (details: RoomType[]) => {
    if (!details) return [];
    const roomSet = new Set();
    details.forEach(detail => {
      const room = rooms.find(room => room.roomId == detail.roomId);
      if (room) {
        roomSet.add("Room " + room.name);
      }
    });
    return [...roomSet];
  }
  const filterTrainerList = async (details: ClassDetailType[]) => {
    if (!details) return [];
    const trainerSet = new Set<string>();
    await Promise.all(
      details.map(async (detail) => {
        const userData = await getUserById(detail.trainerId + "");
        trainerSet.add(userData.data.result.user.fullName);
      })
    );
    return Array.from(trainerSet);
  }
  const getDetail = async () => {
    setIsLoading(true);
    try {
      // eslint-disable-next-line react/prop-types
      const result = await axiosClient.get(`/api/Class/Detail/${props.id}`);
      setDetailData(result.data.result);
    } catch (error) {
      return handleApiError(error);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const getInstructor = async (id:any) => {
    setIsLoading(true);
    try {
      const result = await axiosClient.get(`/api/User/GetBy/${id}`)
      console.log(result.data.result.user.fullName );
      
      if(!instructorName.includes(result.data.result.user.fullName )){
        setInstructorName([...instructorName,result.data.result.user.fullName])
      }
     
    } catch (error) {
      return handleApiError(error)
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }

  const fetchRooms = async () => {
    setIsLoading(true);
    const { data } = await getAllRooms();
    dispatch(setRooms(data.result));
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }

  useEffect(() => {
    fetchRooms();
    getDetail();
  }, []);

  useEffect(() => {
    const fetchTrainer = async () => {
      setTrainerList(await filterTrainerList(detailData?.classDetail));
    }
    setFilteredRoomList(filterRoomList(detailData?.classDetail));
    fetchTrainer();
  }, [detailData]);

  useEffect(() => {
    if (detailData?.class?.instructorId) {
      getInstructor(detailData?.class?.instructorId);
    }
  }, [detailData]);
  if (isLoading) return <Loading />
  return (
    <Collapse icon={<NavigationIcons icon={'calendar-today'} />} title="General" {...props}>
      <div className="p-5">
        <div className="grid grid-cols-3 gap-x-1">
          <div className="col-span-1 font-bold">
            <div className="flex items-center">
              <OtherIcons icon="alarm" className="mr-2 text-blue-700" /> Class time
            </div>
          </div>
          <div className="col-span-2">
            {
              detailData?.classTime
            }
          </div>
        </div>
        <div className="grid grid-cols-3 py-3 gap-x-1">
          <div className="col-span-1 font-bold">
            <div className="flex items-center">
              <OtherIcons icon="domain" className="mr-2 text-blue-700" /> Location
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-2">

            {filteredRoomList && filteredRoomList.map((room: any, index: number) => {
              return (
                <div className="flex gap-1" key={`room-${index}`}>
                  <div key={`location-${index}`}>{room}</div>
                  <IndicatorIcons icon="warning-logo" className="w-2 text-green-500" />
                </div>
              )
            })
            }
          </div>
        </div>
        <div className="grid grid-cols-3 py-3 gap-x-1">
          <div className="col-span-1 font-bold">
            <div className="flex items-center">
              <DeliveryTypesIcons icon="lecture" className="mr-2 text-blue-700" /> Trainer
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            {
              trainerList?.map((trainer, index: number) => {
                return (
                  <div className="flex gap-1" key={`class-trainer-${index}`}>
                    <a className="text-blue-600 underline underline-offset-2">{trainer}</a>
                    <IndicatorIcons icon="warning-logo" className="w-2 text-green-500" />
                  </div>
                )
              })
            }

          </div>
        </div>
        {/* Semester*/}
        <div className="grid grid-cols-3 py-3">
          <div className="col-span-1 font-bold">
            <div className="flex items-center">
              <OtherIcons icon="local-library" className="mr-2 text-blue-700" /> Semester
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <div className="flex gap-1">
              <div>{detailData?.class?.semester?.semesterName}</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 py-3 gap-x-1">
          <div className="col-span-1 font-bold">
            <div className="flex items-center">
              <IndicatorIcons icon="grade" className="mr-2 text-blue-700" /> Admin
            </div>
          </div>

          <div className="col-span-2 flex flex-col gap-2">
            <div className="flex gap-1">
              <a className="text-blue-600 underline underline-offset-2">{instructorName}</a>
              <IndicatorIcons icon="warning-logo" className="w-2 text-green-500" />
            </div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="border-b border-b-black my-3" />
        {/* CREATED */}
        <div className="grid grid-cols-3 my-2">
          <div className="col-span-1  font-bold">Created</div>
          <div className="col-span-2">
            <div>

              <div>{formatDate(new Date(detailData?.createdDate))} by {detailData?.createdBy}</div>

            </div>
          </div>
        </div>
        {/* REVIEW */}
        <div className="grid grid-cols-3 my-2">
          <div className="col-span-1  font-bold">Modify</div>
          <div className="col-span-2">
            <div>
              {detailData?.modifiedDate ? formatDate(new Date(detailData?.modifiedDate)) : <></>} <span> {detailData?.modifiedBy ? <span>by {detailData?.modifiedBy}</span> : <></>}</span>

            </div>
          </div>
        </div>

      </div>



    </Collapse >
  );
};

export default General;

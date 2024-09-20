/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from '@/components/Typography';
import NotFound from '@/components/error/NotFound';
import Loading from '@/components/loading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useAppSelector } from '@/hooks/useRedux';
import { createSchedule, getClassDetail } from '@/lib/api/class-api';
import { getAllRooms } from '@/lib/api/room-api';
import { getTrainingProgramById } from '@/lib/api/training-program-api';
import { getAllUsers } from '@/lib/api/user-api';
import { setClassDetail } from '@/lib/redux/classDetailSlice';
import { setRooms } from '@/lib/redux/roomSlice';
import { setClassIdAndSemesterId, setScheduleDetails } from '@/lib/redux/scheduleSlice';
import { setTrainingProgram } from '@/lib/redux/trainingProgramSlice';
import { setUsers } from '@/lib/redux/userSlice';
import { formatDate } from '@/utils/DateUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';
import SyllabusCard from './SyllabusCard';

const index = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classDetail = useAppSelector(state => state.classDetail.classDetail);
    const trainingProgram = useAppSelector(state => state.trainingProgram.trainingProgram);
    const schedule = useAppSelector(state => state.schedule);
    
    const { classID } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            if (classID) {
                const { data } = await getClassDetail(classID);
                console.log("data",data);
                
                dispatch(setClassIdAndSemesterId({ classId: data?.result?.class.classId, semesterId: data?.result?.class.semesterId }));
                dispatch(setClassDetail(data?.result));
            }
            setTimeout(() => {
                setIsLoading(false);
            }, 500)
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getAllUsers();
            dispatch(setUsers(data.result.users));
            setTimeout(() => {
                setIsLoading(false);
            }, 500)
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getAllRooms();
            dispatch(setRooms(data.result));
            setTimeout(() => {
                setIsLoading(false);
            }, 500)
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            if (classDetail) {
                const { data } = await getTrainingProgramById(classDetail.class.program.programId);

                dispatch(setScheduleDetails(data?.result?.listSyllabus.map((syllabus: any) => {
                    console.log(syllabus)
                    return {
                        syllabusId: syllabus.syllabusId,
                        slot: 1,
                        trainerId: 0,
                        roomId: 0,
                        date: new Date().toISOString(),
                    }
                })));
                console.log(data);
                
                dispatch(setTrainingProgram(data?.result));
            }
            setTimeout(() => {
                setIsLoading(false);
            }, 500)
        }
        fetchData();
    }, [classDetail])

    const handleSubmit = () => {
        createSchedule(schedule.classId, schedule.semesterId, schedule.scheduleDetails)
        .then((res) => {
            console.log(res)
            if(res.error) {
                toast.error(res.error?.result?.message);
                return;
            }
            toast.success('Create class schedule successfully');
            navigate(`/class/${classID}`);
            return;
        })
        .catch((err) => {
            toast.error(err.message);
        })
    }
    const handleCancel = () => {
        navigate(`/class/${classID}`);
    }
    const FormSchema = z.object({
        dob: z.date({
            required_error: "A date of birth is required.",
        }),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    if (isLoading || !trainingProgram) {
        return <Loading />
    }
    if (!isLoading && !classDetail) {
        return <NotFound />
    }
    return (
        <div>
            <Form {...form}>
                    <div className='px-5'>
                        <Typography type="h3" className='mt-4'>Create class schedule</Typography>
                        <div className='flex justify-between'>
                            <div className="flex flex-row  items-center gap-5">
                                <Typography type="h1">{classDetail?.class.className}</Typography>
                                <Badge>{classDetail?.class.status}</Badge>
                            </div>
                            <div className='flex gap-2'>
                                <Button variant={'outline'} type='button' className='text-red-500' onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button type='submit' onClick={handleSubmit}>
                                    Create
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className='mt-3 px-5 py-3 border-t border-t-black border-b border-b-black'>
                        Modified on {classDetail?.modifiedDate? new Date(classDetail.modifiedDate).toLocaleDateString():"[Backend's fault]"} by {classDetail?.modifiedBy? classDetail?.modifiedBy:"[Backend's fault]"}
                    </div>

                    <div className='p-5'>
                        <div className='py-3 px-5 shadow bg-primary text-white rounded-t-lg'>
                            <h1 className='text-sm'>Training program</h1>
                            <Typography type="h3" className='mt-0'>
                                <Link to={`/training-program/${classDetail.programId}`}>
                                    {trainingProgram.programName}
                                </Link>
                            </Typography>
                            <div className='mt-3'>
                                v{classDetail.class.program.version}<span className='mx-2'>|</span>Modified on {formatDate(new Date(trainingProgram.lastModifiedDate))} by {trainingProgram.lastUpdatedBy|| "[Backend's fault]"}
                            </div>
                        </div>

                        <div className="h4 border border-black rounded-lg mt-5 relative p-5">
                            <span className='bg-white absolute top-[-10px] left-5 font-bold text-sm px-1'>Syllabus list</span>
                            <div className='flex flex-col gap-2'>
                                {
                                    trainingProgram?.listSyllabus.length ? trainingProgram.listSyllabus.map((syllabus: any, index: number) => {
                                        return <SyllabusCard syllabus={syllabus} key={`training-program-syllabus-${index}`} form={form} />
                                    }) : <span className='italic text-gray-500'>This training program have no syllabus</span>
                                }
                            </div>
                        </div>
                    </div>
            </Form>
        </div>

    )
}

export default index
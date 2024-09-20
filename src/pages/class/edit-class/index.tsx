import ContentCard from '@/components/ContentCard';
import OtherIcons from '@/components/icons/other-icons';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select as CnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from '@/hooks/useRedux';
import { editClass, getClassDetail } from '@/lib/api/class-api';
import { getAllSemester } from '@/lib/api/semester-api';
import { getTrainingProgramById, getTrainingPrograms } from '@/lib/api/training-program-api';
import { getAllUsers } from '@/lib/api/user-api';
import { RootState } from '@/lib/redux/store';
import { formatDate } from '@/utils/DateUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookIcon, BoxIcon, CalendarIcon, CircleUserRoundIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { z } from 'zod';
import SearchItem from '../list-of-class/components/SearchItem';

function EditFormClassPage() {
  const user = useAppSelector((state: RootState) => state.currentUser.user);
  const { classID } = useParams();
  const [options, setOptions] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [admins, setAdmins] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatItem = ({  label }: any) => {
    return <SearchItem item={label} />;
  };
  const [isLoading] = useState(false);
  const navigate = useNavigate();
  const formSchema = z.object({
    className: z.string({
      required_error: "class name is required.",
    }).trim().min(2).max(50),
    programId: z.number({
      required_error: "Training program is required.",
    }),
    instructorId: z.string({
      required_error: "Admin is required.",
    }),
    semesterId: z.string({
      required_error: "Semester is required.",
    }),
    status: z.string().trim().min(2).max(20),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      className: '',
      programId: 0,
      instructorId: '',
      semesterId: '',
      status: 'Opening'
    }
  });

  form.watch(['className', 'semesterId', 'programId', 'instructorId']);

  useEffect(() => {
    getClassDetail(classID?.toString() || "0").then((res) => {
      console.log(res.data.result);
      
      form.setValue('className', res.data.result.class.className);
      form.setValue('programId', res.data.result.class.program.programId);
      form.setValue('instructorId', res.data.result.class.instructor.userId?.toString());
      form.setValue('semesterId', res.data.result.class.semester.semesterID?.toString());
      form.setValue('status', res.data.result.class.status);
      
      
    }
    )
  }
    , [classID])


  function onSubmit(values: z.infer<typeof formSchema>) {
    createClassAsync(values);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createClassAsync = async (values: any) => {
    getTrainingProgramById(values.programId).then((res) => {
      if (res.data.result.listSyllabus?.length == 0) {
        toast.error("Training Program have no syllabus.Please choose again")
        return;
      }
    });
    const {  error } = await editClass(+(classID || 0), {
      className: values.className,
      programId: values.programId,
      instructorId: parseInt(values.instructorId),
      semesterId: parseInt(values.semesterId),
      status: values.status,
    });
    if (!error) {
      toast.success("Class edited successfully")
      setTimeout(
        () => {
          navigate(`/class/${classID}`);
        }, 1000
      )
    } else {
      console.log(error);
      toast.error(error)
    }
  }
  useEffect(() => {
    getTrainingPrograms().then((res) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log(res.data.result);
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const list = res?.data?.result?.trainingPrograms.map((item: any) => {
        return { value: item.programName, label: item };
      });
      console.log(list);
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setOptions(list as any);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAllSemester();
      setSemesters(data.semesters);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAllUsers();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const adminsList = data.result.users.filter((user: any) => user.roleName == "Admin");
      console.log(adminsList);
      
      setAdmins(adminsList);
    }
    fetchData();
  }, []);

  useEffect(() => {
    document.title = "Update Class - FAMS"
  }, [])

  if (isLoading) {
    return <Loading />;
  }
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="py-3 px-10">
          <h1 className="text-xl">Update New Class</h1>
          <div className="flex justify-between mt-2">
            <div className="flex items-center gap-2">
              <h2 className="text-4xl font-bold">{form.getValues('className') ? form.getValues('className') : '[New Class]'}</h2>
              <span className="bg-blue-300 text-blue-700 px-3 rounded-full">{'Draft'}</span>
            </div>
            <div className="flex gap-3">
              <Link to={"/class/" + classID}>
                <Button variant="outline" className="text-red-500 hover:text-red-500" type='button'>
                  Cancel
                </Button>
              </Link>
              <Button type="submit">Update</Button>
            </div>
          </div>
        </div>
        <div className="border-t border-b border-t-black border-b-black flex py-3 px-10 gap-3">
          <span>
            Created on {formatDate(new Date())} by {user?.userName}
          </span>
        </div>
        <div className="p-5">
          <ContentCard title="Brief Information" icon={<OtherIcons icon="local-library" />}>
            <div className="p-2 grid grid-cols-12 gap-5">
              <FormField
                control={form.control}
                name="className"
                render={({ field }) => (
                  <FormItem className='col-span-12'>
                    <div className="flex gap-2 font-bold items-center">
                      <BookIcon />
                      Class name
                    </div>
                    <FormControl>
                      <Input placeholder="Class name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="semesterId"
                render={({ field }) => {
                  console.log(field);
                  
                  return <FormItem className='col-span-6'>
                  <div className="flex gap-2 font-bold items-center">
                    <CalendarIcon />
                    Semester
                  </div>
                  <CnSelect onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a semester"  />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        semesters.map((semester: any, index: number) => {


                          return (
                            <SelectItem value={semester.semesterID + ""} key={`semester-${index}`}>{semester.semesterName}</SelectItem>
                          )
                        })
                      }
                    </SelectContent>
                  </CnSelect>
                  <FormMessage />
                </FormItem>
                }}
              />
              <FormField
                control={form.control}
                name="instructorId"
                render={({ field }) => {
                  console.log(field);
                  
                  return (
                    <FormItem className='col-span-6'>
                      <div className="flex gap-2 font-bold items-center">
                        <CircleUserRoundIcon />
                        Admin
                      </div>
                      <CnSelect onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an admin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            admins.map((admin: any, index: number) => {
                              return (
                                <SelectItem value={admin.userId + ""} key={`admin-${index}`}>{admin.fullName}</SelectItem>
                              )
                            })
                          }
                        </SelectContent>
                      </CnSelect>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name="programId"
                render={({field}) => {
                  console.log(field);
                  console.log(options);
                  
                  console.log(options[field.value-1]);
                  const defaultValue= options.filter((item)=>{
                    return item.label.programId === field.value
                  })
                  return (
                    <FormItem className='col-span-12'>
                      <div className="flex gap-2 font-bold items-center pb-2">
                        <BoxIcon />
                        Select training program
                      </div>
                      <FormControl>
                        <Select
                          
                          placeholder="Select training program"
                          options={options}
                          formatOptionLabel={(options) => formatItem(options)}
                         
                          value={defaultValue }
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          onChange={(e: any) => {
                            form.setValue("programId", e.label.programId);
                          }}
                        ></Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </div>
          </ContentCard>
        </div>
      </form>
    </FormProvider>
  );
}
export default EditFormClassPage;

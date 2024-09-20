/* eslint-disable @typescript-eslint/no-explicit-any */
import ContentCard from '@/components/ContentCard';
import OtherIcons from '@/components/icons/other-icons';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select as CnSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppSelector } from '@/hooks/useRedux';
import { createClass } from '@/lib/api/class-api';
import { getAllSemester } from '@/lib/api/semester-api';
import { getTrainingProgramById, getTrainingPrograms } from '@/lib/api/training-program-api';
import { getAllUsers } from '@/lib/api/user-api';
import { RootState } from '@/lib/redux/store';
import { formatDate } from '@/utils/DateUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookIcon, BoxIcon, CalendarIcon, CircleUserRoundIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { z } from 'zod';
import SearchItem from '../list-of-class/components/SearchItem';

function CreateFormClassPage() {
  const user = useAppSelector((state: RootState) => state.currentUser.user);
  const [options, setOptions] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [admins, setAdmins] = useState([]);
  const formatItem = ({ label}:any) => {
    return <SearchItem item={label} />;
  };
  const [isLoading] = useState(false);
  const navigate = useNavigate();
  const formSchema = z.object({
    className: z
      .string({
        required_error: 'class name is required.',
      })
      .trim()
      .min(2)
      .max(50),
    programId: z.number({
      required_error: 'Training program is required.',
    }),
    instructorId: z.string({
      required_error: 'Admin is required.',
    }),
    semesterId: z.string({
      required_error: 'Semester is required.',
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
      status: 'Opening',
    },
  });

  form.watch(['className', 'semesterId', 'programId', 'instructorId']);

  function onSubmit(values: z.infer<typeof formSchema>) {
    createClassAsync(values);
  }
  const createClassAsync = async (values: any) => {
    getTrainingProgramById(values.programId).then((res) => {
      console.log(res);
      if (res.data.result.listSyllabus?.length == 0) {
        toast.error('Training Program have no syllabus.Please choose again');
        return;
      }
    });

    const { data, error } = await createClass({
      className: values.className,
      programId: values.programId,
      instructorId: parseInt(values.instructorId),
      semesterId: parseInt(values.semesterId),
      status: values.status,
    });
    if (!error) {
      toast.success('Class created successfully');
      setTimeout(() => {
        navigate(`/class/${data.result.class.classId}/create-schedule`);
      }, 1000);
    } else {
      console.log(error);

      toast.error(error.result.message);
    }
  };
  useEffect(() => {
    getTrainingPrograms().then((res) => {
      const list = res?.data?.result?.trainingPrograms.map((item: any) => {
        return { value: item.programName, label: item };
      });
      setOptions(list as any);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAllSemester();
      setSemesters(data.semesters);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAllUsers();
      const adminsList = data.result.users.filter((user: any) => user.roleName == 'Admin');
      setAdmins(adminsList);
    };
    fetchData();
  }, []);

  useEffect(() => {
    document.title = 'Create Class - FAMS';
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="py-3 px-10">
          <h1 className="text-xl">Create New Class</h1>
          <div className="flex justify-between mt-2">
            <div className="flex items-center gap-2">
              <h2 className="text-4xl font-bold">{form.getValues('className') ? form.getValues('className') : '[New Class]'}</h2>
              <span className="bg-blue-300 text-blue-700 px-3 rounded-full">{'Draft'}</span>
            </div>
            <div className="flex gap-3">
              <Link to="/class">
                <Button variant="outline" className="text-red-500 hover:text-red-500" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit">Create</Button>
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
                  <FormItem className="col-span-12">
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
                render={({ field }) => (
                  <FormItem className="col-span-6">
                    <div className="flex gap-2 font-bold items-center">
                      <CalendarIcon />
                      Semester
                    </div>
                    <CnSelect onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a semester" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {semesters.map((semester: any, index: number) => {
                          return (
                            <SelectItem value={semester.semesterID + ''} key={`semester-${index}`}>
                              {semester.semesterName}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </CnSelect>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instructorId"
                render={({ field }) => (
                  <FormItem className="col-span-6">
                    <div className="flex gap-2 font-bold items-center">
                      <CircleUserRoundIcon />
                      Admin
                    </div>
                    <CnSelect onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an admin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {admins.map((admin: any, index: number) => {
                          return (
                            <SelectItem value={admin.userId + ''} key={`admin-${index}`}>
                              {admin.fullName}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </CnSelect>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="programId"
                render={() => (
                  <FormItem className="col-span-12">
                    <div className="flex gap-2 font-bold items-center pb-2">
                      <BoxIcon />
                      Select training program
                    </div>
                    <FormControl>
                      <Select
                        isClearable
                        placeholder="Select training program"
                        options={options}
                        formatOptionLabel={(options) => formatItem(options)}
                        onChange={(e: any) => {
                          console.log(e.label);
                          form.setValue('programId', e.label.programId);
                        }}
                      ></Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </ContentCard>
        </div>
      </form>
    </FormProvider>
  );
}
export default CreateFormClassPage;

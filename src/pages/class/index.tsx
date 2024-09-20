import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import Select from 'react-select';
import { formatDate } from '@/utils/DateUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookIcon, CogIcon, QrCodeIcon } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAppSelector } from '@/hooks/useRedux';
import { z } from 'zod';
import { RootState } from '@/lib/redux/store';
import ContentCard from '../../components/ContentCard';
import OtherIcons from '@/components/icons/other-icons';
import { DatePickerWithRange } from './list-of-class/components/daypicker';
import { getTrainingPrograms } from '@/lib/api/training-program-api';
import SearchItem from './list-of-class/components/SearchItem';
import Loading from '@/components/loading';
const formSchema = z.object({
  className: z.string().min(2).max(50),
  programId: z.string().min(2).max(10),
  instructorId: z.string().min(2).max(50),
  startDate: z.string().min(2).max(50),
  endDate: z.string().min(2).max(50),
  status: z.string().min(2).max(50),
});
function CreateFormClassPage() {
  const user = useAppSelector((state: RootState) => state.currentUser.user);
  const [options, setOptions] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatItem = ({  label }: any) => {
    return <SearchItem item={label} />;
  };
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      className: '',
      programId: '',
      instructorId: '',
      startDate: '',
      endDate: '',
      status: '',
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setIsLoading(true);
    navigate('/class');
    form.watch(['className', 'programId', 'instructorId', 'startDate', 'endDate', 'status']);
  }
  useEffect(() => {
    getTrainingPrograms().then((res) => {
      // setTrainingProgramList(res?.data?.result?.trainingPrograms);
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
    document.title = "Create Class - FAMS"
  }, [])
  

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
                <Button variant="outline" className="text-red-500 hover:text-red-500">
                  Cancel
                </Button>
              </Link>

              <Button type="submit">Create</Button>
            </div>
          </div>
        </div>
        <div className="border-t border-b border-t-black border-b-black flex py-3 px-10 gap-3">
          <span className="font-bold">
            {form.getValues('programId') ? form.getValues('programId') : '[programId]'} v{form.getValues('status') ? form.getValues('status') : '[status]'}
          </span>{' '}
          &bull;{' '}
          <span>
            Created on {formatDate(new Date())} by {user?.userName}
          </span>
        </div>
        <div className="p-5">
          <ContentCard title="Brief Information" icon={<OtherIcons icon="local-library" />}>
            <div className="space-y-4 p-2">
              <FormField
                control={form.control}
                name="className"
                render={({ field }) => (
                  <FormItem>
                    <div className="col-span-4 flex gap-2 font-bold items-center">
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
                name="programId"
                render={({ field }) => (
                  <FormItem>
                    <div className="col-span-4 flex gap-2 font-bold items-center">
                      <QrCodeIcon />
                      Program ID
                    </div>
                    <FormControl>
                      <Input placeholder="Program Id " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex space-x-5">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={() => (
                    <FormItem>
                      <div className="col-span-4 flex gap-2 font-bold items-center">
                        <CogIcon />
                        Start Date
                      </div>
                      <FormControl>
                        {/* <Input placeholder="startDate" {...field} /> */}
                        <DatePickerWithRange />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={() => (
                    <FormItem>
                      <div className="col-span-4 flex gap-2 font-bold items-center">
                        <CogIcon />
                        End Date
                      </div>
                      <FormControl>
                        {/* <Input placeholder="endDate" {...field} /> */}
                        <DatePickerWithRange />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-3  font-semibold">Select training program</div>

              <Select
                isClearable
                placeholder="Select training program"
                options={options}
                formatOptionLabel={(options) => formatItem(options)}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e: any) => {
                  console.log(e);
                }}
              ></Select>

              <div className="col-span-9"></div>
            </div>
          </ContentCard>
        </div>
      </form>
    </FormProvider>
  );
}
export default CreateFormClassPage;

import ContentCard from '@/components/ContentCard';
import OtherIcons from '@/components/icons/other-icons';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppSelector } from '@/hooks/useRedux';
import { createSyllabus } from '@/lib/api/syllabus-detail-api';
import { RootState } from '@/lib/redux/store';
import { formatDate } from '@/utils/DateUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookIcon, CogIcon, QrCodeIcon, StarIcon, UsersIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { number, z } from 'zod';

  const formSchema = z.object({
    name: z.string().trim().min(2).max(50),
    code: z.string().trim().min(2).max(10),
    level: z.string().trim().min(2).max(50),
    version: z.string().trim().min(2).max(10),   
    attendeeNumber: z
      .number()
      .min(1, {
        message: 'The number of attendees must be between 0 and 100',
      })
      .max(100, {
        message: 'The number of attendees must be between 0 and 100',
      }),
  });

function CreateSyllabusPage() {
  const user = useAppSelector((state: RootState) => state.currentUser.user);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Create Syllabus - FAMS"
  }, [])

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      code: '',
      level: '',
      version: '1.0',
      attendeeNumber: 0,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setIsLoading(true);

    createSyllabus({
      name: values.name,
      code: values.code,
      level: values.level,
      version: values.version,
      attendeeNumber: values.attendeeNumber,
      technicalRequirement: 'string',
      courseObjectives: 'string',
    })
      .then((res) => {
        if (res?.error) {
          toast.error(res.error || 'An unexpected error occurred');
          return;
        } else {
          console.log(res?.data?.syllabusId)
          toast.success('Syllabus created successfully');
          navigate('/syllabus/'+res?.data?.syllabusId);
        }
      })
      .finally(() => setIsLoading(false));
  }

  form.watch(['name', 'code', 'level', 'version']);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="py-3 px-10">
          <h1 className="text-xl">Create New Syllabus</h1>
          <div className="flex justify-between mt-2">
            <div className="flex items-center gap-2">
              <h2 className="text-4xl font-bold">{form.getValues('name') ? form.getValues('name') : '[New Syllabus]'}</h2>
              <span className="bg-blue-300 text-blue-700 px-3 rounded-full">{'Draft'}</span>
            </div>
            <div className="flex gap-3">
              <Link to="/syllabus">
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
            {form.getValues('code') ? form.getValues('code') : '[Code]'} v{form.getValues('version') ? form.getValues('version') : '[Version]'}
          </span>{' '}
          &bull;{' '}
          <span>
            Created on {formatDate(new Date())} by {user?.fullName}
          </span>
        </div>
        <div className="p-5">
          <ContentCard title="Brief Information" icon={<OtherIcons icon="local-library" />}>
            <div className="space-y-4 p-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="col-span-4 flex gap-2 font-bold items-center">
                      <BookIcon />
                      Syllabus name
                    </div>
                    <FormControl>
                      <Input placeholder="Syllabus name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <div className="col-span-4 flex gap-2 font-bold items-center">
                      <QrCodeIcon />
                      Code
                    </div>
                    <FormControl>
                      <Input placeholder="Syllabus code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <div className="col-span-4 flex gap-2 font-bold items-center">
                      <StarIcon />
                      Level
                    </div>
                    <FormControl>
                      <Input placeholder="Level" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="version"
                render={({ field }) => (
                  <FormItem>
                    <div className="col-span-4 flex gap-2 font-bold items-center">
                      <CogIcon />
                      Version
                    </div>
                    <FormControl>
                      <Input placeholder="Version" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="attendeeNumber"
                render={({ field }) => (
                  <FormItem>
                    <div className="col-span-4 flex gap-2 font-bold items-center">
                      <UsersIcon />
                      Attendee number
                    </div>
                    <FormControl>
                      <Input placeholder="Number" {...field} type="number"  onChange={(e) => {
                        console.log(form.getValues('attendeeNumber'));
                        
                        if(form.getValues('attendeeNumber')>-1){
                          form.setValue('attendeeNumber', +e.target.value)
                        }
                        else{
                          form.setValue('attendeeNumber',0)
                        }
                        
                        }} />
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

export default CreateSyllabusPage;

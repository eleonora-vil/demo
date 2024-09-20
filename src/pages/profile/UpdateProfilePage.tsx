/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import TitleBanner from '@/components/title-banner';
import { updateReRenderFunction } from '@/lib/redux/dataTableSlice';
import { setIsUpdateFormOpen } from '@/lib/redux/form/userFormSlice';
import { formatDate } from '@/utils/DateUtils';
import { updateInfo } from '@/lib/api/create-trainee/update-info';

const phoneRegex = new RegExp(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/);

const genderOptions = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
  {
    label: 'Other',
    value: 'other',
  },
];

const formSchema = z.object({
  UserName: z.string().min(3, { message: 'The username must be at least 3 characters.' }).max(30, { message: 'The username must be max 30 characters' }),
  FullName: z
    .string()
    .regex(/^[A-Za-z\s]*$/, { message: 'The full name cannot be written with accents or special characters.' })
    .min(3, { message: 'The full Name must be at least 3 characters.' }),
  Level: z.string().min(3, { message: 'The level must be at least 3 characters.' }).max(30, { message: 'The level must be max 30 characters' }),
  PhoneNumber: z.string().regex(phoneRegex, {
    message: 'Phone number is invalid',
  }),
  Address: z
    .string()
    .regex(/^[A-Za-z\s]*$/, { message: 'The full name cannot be written with accents or special characters.' })
    .min(3, { message: 'The address must be at least 3 characters.' })
    .max(30, { message: 'The address must be max 30 characters' }),
  Gender: z.string(),
  BirthDate: z.date({
    required_error: 'A date of birth is required.',
  }),
});

const imageMimeType = /image\/(png|jpg|jpeg)/i;

export default function UpdateProfilePage() {
  const [file, setFile] = useState<File>();
  const [fileDataURL, setFileDataURL] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.currentUser.user);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      UserName: '',
      FullName: '',
      BirthDate: new Date(),
      Gender: 'male',
      Level: '',
      Address: '',
      PhoneNumber: '',
    },
  });

  useEffect(() => {
    form.setValue('UserName', user.userName);
    form.setValue('FullName', user.fullName);
    form.setValue('BirthDate', user?.dateOfBirth ? new Date(user?.dateOfBirth) : new Date());
    form.setValue('Gender', user.gender.toLowerCase());
    form.setValue('Level', user.level);
    form.setValue('Address', user.address);
    form.setValue('PhoneNumber', user.phoneNumber);
  }, []);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file: File = files[0];
      if (!file.type.match(imageMimeType)) {
        alert('Image mime type is not valid');
        return;
      }
      setFile(file);
    }
  };
  useEffect(() => {
    let fileReader: FileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target as FileReader;
        if (result && !isCancel) {
          setFileDataURL(result as string);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        (fileReader as FileReader).abort();
      }
    };
  }, [file]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    values.BirthDate.setDate(values.BirthDate.getDate() + 1);
    updateInfo({
      email: user.email,
      body: { ...values, Avatar: file, Password: '' },
    })
      .then((res) => {
        if (!res.success) {
          // console.log(res.error);
          toast.error('Failed to update user');
        } else {
          toast.success('Update user successfully');
          dispatch(updateReRenderFunction());
          dispatch(setIsUpdateFormOpen(false));
          navigate('/profile');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  useEffect(() => {
    document.title = "Update Profile - FAMS"
  }, [])
  return (
    <div className=" p-4">
      <TitleBanner title={'Update Profile'} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-4  ">
            <Card className="p-4 w-[350px] space-y-2 h-fit">
              {fileDataURL ? (
                <div className="aspect-square bg-slate-200 rounded-md w-full flex items-center justify-center">
                  <img src={fileDataURL} alt="avatar" />
                </div>
              ) : (
                <div className="aspect-square bg-slate-200 rounded-md w-full flex items-center justify-center">
                  <img src={user.avatar ? user.avatar : 'https://avatar.iran.liara.run/public/boy?username=FAMS'} alt="@fams" className="w-full h-full object-cover rounded-md" />
                </div>
              )}

              <div>
                <Button type="button" className="w-full hover:cursor-pointer bg-slate-200 text-slate-500 hover:bg-slate-300" asChild>
                  <label htmlFor="profileImageInput">Click me to upload file</label>
                </Button>

                <input type="file" id="profileImageInput" accept=".png, .jpg, .jpeg" onChange={changeHandler} style={{ display: 'none' }} />
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="FullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name" {...field} type="text" autoComplete="full name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="UserName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="username" {...field} autoComplete="username" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>
            <Card className=" w-[500px] flex-1">
              <CardHeader>
                <CardDescription className="">Fill your information to complete update account</CardDescription>
              </CardHeader>
              <CardContent className="grid-cols-2 grid gap-5">
                <FormField
                  control={form.control}
                  name="Level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Level</FormLabel>
                      <FormControl>
                        <Input placeholder="Level" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Gender"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {genderOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value} className="cursor-pointer">
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="BirthDate"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Date of birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button variant={'outline'} className={cn('w-full justify-start text-left font-normal', !field.value && 'text-muted-foreground')}>
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? <span>{formatDate(field.value)}</span> : <span>Pick a date</span>}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent align="start" className=" w-auto p-0">
                            <Calendar
                              mode="single"
                              captionLayout="dropdown-buttons"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date: any) => date > new Date() || date < new Date('1900-01-01')}
                              fromYear={1960}
                              toYear={2030}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="PhoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone number" {...field} type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Address" {...field} autoComplete="address" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} type="submit" className="col-span-2">
                  {isLoading ? 'Uploading...' : 'Update Profile'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}

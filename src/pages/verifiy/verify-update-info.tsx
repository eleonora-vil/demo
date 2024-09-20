import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, buttonVariants } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, ChevronDownIcon, Regex } from 'lucide-react';
import { format, set } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImagePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { UpdateInfoData, updateInfo } from '@/lib/api/create-trainee/update-info';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setStepCompleted } from '@/lib/redux/verify-step';

const phoneRegex = /^\d{10,11}$/;

const formSchema = z
  .object({
    UserName: z.string().min(3, { message: 'Username must be at least 3 characters.' }).max(30, { message: 'Username must be max 30 characters' }),
    FullName: z.string().min(3, { message: 'Full Name must be at least 3 characters.' }),
    Level: z.string(),
    PhoneNumber: z.string().regex(phoneRegex, {
      message: 'Phone number is invalid',
    }),
    Address: z.string(),
    Gender: z.string(),
    BirthDate: z.date({
      required_error: 'A date of birth is required.',
    }),
    Password: z
      .string({
        required_error: 'New Password is required',
      })
      .min(6, { message: 'New Password must be at least 6 characters.' })
      .max(30, { message: 'New Password must be max 30 characters' }),
    confirmPassword: z.string({}),
  })
  .refine((data) => data.Password === data.confirmPassword, {
    message: 'Oops! Password does not match',
    path: ['confirmPassword'],
  });

const imageMimeType = /image\/(png|jpg|jpeg)/i;

export default function VerifyUpdateInfo() {
  const [file, setFile] = useState<File>();
  const [fileDataURL, setFileDataURL] = useState<string>('');
  const email = useAppSelector((state) => state.verifyUser.email);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const handleSubmit = async (data: UpdateInfoData) => {
    const response = await updateInfo(data);
    const { success, result } = response;
    setIsLoading(false);
    if (success) {
      toast.success(result.message);
      setTimeout(() => {
        dispatch(setStepCompleted(1));
        setIsLoading(false);
      }, 500);
    } else {
      toast.error(result.message);
      setIsLoading(false);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const submitData: UpdateInfoData = {
      email: email || '',
      body: {
        UserName: values.UserName,
        Password: values.Password,
        FullName: values.FullName,
        Gender: values.Gender,
        Level: values.Level,
        Address: values.Address,
        BirthDate: values.BirthDate,
        PhoneNumber: values.PhoneNumber,
        Avatar: file,
      },
    };
    handleSubmit(submitData);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
          <div className="flex gap-4">
            <Card className="p-4 w-[250px] space-y-2 h-fit ">
              {fileDataURL ? (
                <div className="aspect-square bg-slate-200 rounded-md w-full flex items-center justify-center">
                  <img src={fileDataURL} alt="avatar" className="w-full h-full object-cover rounded-md" />
                </div>
              ) : (
                <div className="aspect-square bg-slate-200 rounded-md w-full flex items-center justify-center">
                  <ImagePlus className="w-8 h-8 m-auto text-slate-500" />
                </div>
              )}

              <div>
                {/* <ImageInput /> */}

                <Button type="button" className="w-full hover:cursor-pointer bg-slate-200 text-slate-500 hover:bg-slate-300" asChild>
                  <label htmlFor="image">Click me to upload file</label>
                </Button>

                <input type="file" id="image" accept=".png, .jpg, .jpeg" onChange={changeHandler} style={{ display: 'none' }} />
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="FullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Ngo Gia Huan" {...field} type="text" />
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
                        <Input placeholder="huan1234" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>
            <Card className=" w-[500px]">
              <CardHeader>
                <CardDescription className="">Fill your information to complete create account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <div className="flex-1 space-y-6">
                    <FormField
                      control={form.control}
                      name="Level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Level</FormLabel>
                          <FormControl>
                            <Input placeholder="Senior" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="Gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="Password"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Password" {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1 space-y-6">
                    <FormField
                      control={form.control}
                      name="BirthDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of birth</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant={'outline'} className={cn('w-[240px] justify-start text-left font-normal', !field.value && 'text-muted-foreground')}>
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                              </Button>
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
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="PhoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="1234567890" {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input placeholder="shadcn" {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="Address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Ho CHi Minh" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Submit'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}

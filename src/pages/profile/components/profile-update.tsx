import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { getUserById, updateUser } from '@/lib/api/user-api';
import { updateReRenderFunction } from '@/lib/redux/dataTableSlice';
import { cn } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

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

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

const formSchema = z.object({
  userName: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  fullName: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .refine((data) => !/\d/.test(data), {
      message: 'String should not contain any numbers',
    }),
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  dateOfBirth: z.date(),
  gender: z.string(),
  level: z.string(),
  address: z.string(),
  phoneNumber: z
    .string()
    .max(10, {
      message: 'Invalid phone number.',
    })
    .regex(phoneRegex, {
      message: 'Invalid phone number.',
    }),
});

export function UserUpdateForm() {
  
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    userId: '',
    userName: '',
    dateOfBirth: new Date(),
    email: '',
    fullName: '',
    gender: '',
    level: '',
    address: '',
    phoneNumber: '',
  });
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: user,
  });

  const { userId } = useAppSelector((state) => state.userForm.user);

  useEffect(() => {
    const handleGetUserById = async () => {
      const res = await getUserById(userId);
      if (res.error) {
        console.log(res.error);
        toast.error(res.error.message);
      }
      if (res.data) {
        const resUser = res.data.result.user;
        setUser({
          userId: resUser.userId,
          userName: resUser.userName,
          dateOfBirth: new Date(resUser.birthDate),
          email: resUser.email,
          fullName: resUser.fullName,
          gender: resUser.gender.toLowerCase(),
          level: resUser.level,
          address: resUser.address,
          phoneNumber: resUser.phoneNumber,
        });
      }
    };
    handleGetUserById();
  }, []);

  useEffect(() => {
    form.setValue('userName', user.userName);
    form.setValue('fullName', user.fullName);
    form.setValue('email', user.email);
    form.setValue('dateOfBirth', new Date(user.dateOfBirth));
    form.setValue('gender', user.gender);
    form.setValue('level', user.level);
    form.setValue('address', user.address);
    form.setValue('phoneNumber', user.phoneNumber);
  }, [user]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    updateUser(userId, {
      dateOfBirth: values.dateOfBirth,
      email: values.email,
      fullName: values.fullName,
      gender: values.gender,
      phoneNumber: values.phoneNumber,
      userName: values.userName,
      level: values.level,
      address: values.address,
    })
      .then((res) => {
        if (res.error) {
          console.log(res.error);
          toast.error(res.error.message);
        } else {
          console.log(res.data);
          toast.success('Update user successfully');
          dispatch(updateReRenderFunction());
          // dispatch(setIsOpen(false))
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1 space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phonenumber</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {genderOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-2 justify-start  gap-0">
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
                        onSelect={field.onChange}
                        // selected={field.value}
                        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                        fromYear={1960}
                        toYear={2030}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-1 space-y-4">
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
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
                  <FormLabel>Level</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button disabled={isLoading} type="submit" className="w-full hover:shadow-primary-md">
          {isLoading ? <Loading /> : 'Update User'}
        </Button>
      </form>
    </Form>
  );
}

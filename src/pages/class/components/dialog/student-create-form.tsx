import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { createUser } from '@/lib/api/user-api';
import { updateReRenderFunction } from '@/lib/redux/dataTableSlice';
import { setIsCreateFormOpen } from '@/lib/redux/form/userFormSlice';
import { cn } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

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
    label: 'Others',
    value: 'others',
  },
];

const userTypeOptions = [
  {
    label: 'Super Admin',
    value: 'Super Admin',
  },
  {
    label: 'Admin',
    value: 'Admin',
  },
  {
    label: 'Instructor',
    value: 'Instructor',
  },
];

const statusOptions = [
  {
    label: 'Active',
    value: 'true',
  },
  {
    label: 'Inactive',
    value: 'false',
  },
];

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'fullName must be at least 2 characters.' }),
  email: z.string().min(1, { message: 'email is required' }).email({ message: 'Invalid email address.' }),
  birthDate: z.date(),
  gender: z.string(),
  address: z.string().min(1, { message: ' address is required' }),
  phoneNumber: z
    .string()
    .min(10, { message: 'Invalid phone number.' })
    .max(10, { message: 'Invalid phone number.' })
    .regex(phoneRegex, { message: 'Invalid phone number.' })
    .refine((value) => value.trim().length > 0, {
      message: 'phoneNumber is required',
    }),
  level: z.string(),
  userName: z.string().min(2, { message: 'userName must be at least 2 characters.' }),
  roleName: z.string().min(1, { message: 'roleName is required' }),
  status: z.string(),
  currentUserName: z.string().optional(),
  password: z
    .string({ required_error: 'New Password is required' })
    .min(6, { message: 'New Password must be at least 6 characters.' })
    .max(30, { message: 'New Password must be max 30 characters' }),
});

export function UserCreateForm() {
  const dispatch = useAppDispatch();
  const defaultBirthDate = new Date();
  defaultBirthDate.setFullYear(defaultBirthDate.getFullYear() - 18);

  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useAppSelector((state) => state.currentUser);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      birthDate: defaultBirthDate,
      email: '',
      fullName: '',
      gender: 'male',
      currentUserName: currentUser.user.userName || '',
      phoneNumber: '',
      password: '',
      level: '',
      status: 'true',
      address: '',
      roleName: '',
      userName: '',
    },
  });

  // Coi lỗi form ở đây
  // console.log(form.formState.errors);
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    values.birthDate.setDate(values.birthDate.getDate() + 1);

    createUser({
      // dateOfBirth: values.dateOfBirth.toDateString(),
      // email: values.email,
      // fullName: values.fullName,
      // gender: values.gender,
      // phoneNumber: values.phoneNumber,
      // type: "Trainer",

      currentUserName: currentUser.user.userName || '',
      userName: values.userName,
      password: values.password,
      fullName: values.fullName,
      email: values.email,
      gender: values.gender,
      level: values.level,
      address: values.address,
      birthDate: values.birthDate,
      phoneNumber: values.phoneNumber,
      status: values.status,
      roleName: values.roleName,
    })
      .then((res) => {
        if (res.error) {
          if (res.error.result && res.error.result.FullName && res.error.result.FullName.length > 0) {
            const errorMessage = res.error.result.FullName[0];
            toast.error('Create Account failed! ' + errorMessage, {
              position: 'top-left',
            });
          } else {
            toast.error('Create Account failed! ' + res.error.result.message, {
              position: 'top-left',
            });
          }
          // toast.error("Create Account failed! " + res.error.result.message, {
          //   position: "top-left",
          // });
          console.log(res.error);
        } else {
          toast.success('Create Account Successfully !', {
            position: 'top-left',
          });
          dispatch(updateReRenderFunction());
          dispatch(setIsCreateFormOpen(false));
          form.reset();
          console.log(res.data);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1 space-y-2">
              <FormField
                control={form.control}
                name="roleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select user type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {userTypeOptions.map((userType, index) => (
                          <SelectItem value={userType.value} key={index}>
                            {userType.label}
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
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input placeholder="abcd..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User name</FormLabel>
                    <FormControl>
                      <Input placeholder="abcd..." {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="1234..." {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <div className="relative w-full">
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select user type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {statusOptions.map((status, index) => (
                              <SelectItem value={status.value} key={index}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1 space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="a@gmail.com" {...field} />
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
                      <Input placeholder="Your level" {...field} />
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
                      <Input placeholder="district 9 thu duc city" {...field} />
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
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="0123456789" {...field} />
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
                    <div className="relative w-full">
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {genderOptions.map((gender, index) => (
                              <SelectItem value={gender.value} key={index}>
                                {gender.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-4 ">
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={'outline'} className={cn('w-full  justify-start text-left font-normal', !field.value && 'text-muted-foreground')}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className=" w-auto p-0">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown-buttons"
                          onSelect={field.onChange}
                          disabled={(date) => {
                            const minDate = new Date();
                            minDate.setFullYear(minDate.getFullYear() - 18);

                            return date > new Date() || date > minDate;
                          }}
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
                name="currentUserName"
                disabled
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Current user name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button disabled={isLoading} type="submit" className="w-full hover:shadow-primary-md">
            {isLoading ? <Loading /> : 'Create User'}
          </Button>
        </form>
      </Form>
    </>
  );
}

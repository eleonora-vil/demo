/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, buttonVariants } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { registerUser } from '@/lib/api/login';
import { cn } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, ChevronDownIcon, Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import * as z from 'zod';

const formSignUpSchema = z
  .object({
    // fullname: z.string()
    // .min(3, {message: 'Name must be at least 3 characters.'})
    // .max(30, {message: 'Name must be max 30 characters'}),
    username: z.string().min(3, { message: 'Username must be at least 3 characters.' }).max(30, { message: 'Username must be max 30 characters' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    gender: z.string().nonempty(),
    dateOfBirth: z.date({
      required_error: 'A date of birth is required.',
    }),
    avatarUrl: z.string(),
    // phoneNumber: z.string(),
    newPassword: z
      .string({
        required_error: 'New Password is required',
      })
      .min(6, { message: 'New Password must be at least 6 characters.' })
      .max(30, { message: 'New Password must be max 30 characters' }),
    confirmNewPassword: z.string({}),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Oops! Password does not match',
    path: ['confirmNewPassword'],
  });

export type SignUpFormValues = z.infer<typeof formSignUpSchema>;

export default function UserRegisterForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const defaultValues: Partial<SignUpFormValues> = {
    username: '',
    email: '',
    gender: 'Male',
    dateOfBirth: new Date(),
    avatarUrl: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSignUpSchema),
    defaultValues,
    mode: 'onChange',
  });

  const navigate = useNavigate();

  async function onSubmit(values: SignUpFormValues) {
    setIsLoading(true);

    registerUser({
      email: values.email,
      password: values.newPassword,
      fullname: values.username,
      username: values.username,
      gender: values.gender,
      level: '',
      address: '',
      fsu: '',
      phone: '',
    })
      .then((response) => {
        const {  error }: any = response;

        if (error !== null) {
          toast.error(error, {
            position: 'top-left',
          });
        } else {
          toast.success('Create Account Successfully !', {
            position: 'top-left',
          });

          setTimeout(() => {
            // setIsLoading(true);
            navigate('/login');
          }, 1000);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 justify-items-stretch">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Your Username" {...field} />
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
                  <Input placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 justify-items-stretch">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Your Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 justify-items-stretch">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <div className="relative w-full">
                  <FormControl>
                    <select className={cn(buttonVariants({ variant: 'outline' }), 'w-full appearance-none bg-transparent font-normal')} {...field}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </FormControl>
                  <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                </div>
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
        </div>
        <Button disabled={isLoading} type="submit" className="w-full hover:shadow-primary-md">
          {isLoading && <Loader2Icon className="animate-spin" />}
          Sign Up
        </Button>
      </form>
    </Form>
  );
}

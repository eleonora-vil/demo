'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { checkUser } from '@/lib/api/login';
import { cn } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formLoginSchema = z.object({
  email: z.string().email({
    message: 'Email không hợp lệ',
  }),
  password: z.string().min(3, {
    message: 'Password ít nhất 3 ký tự',
  }),
});

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();
  

  // 1. Define your form.
  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formLoginSchema>) {
    setIsLoading(true);
    // test register
    // const result=registerUser(values)
    // console.log((await result).data);
    checkUser(values)
      .then((res) => {
        if (res.error != null) {
          console.log(res.error);
          
          toast.error(res?.error, {
            position: 'top-left',
          });
        } else {
          localStorage.setItem('accessToken', res?.data?.result?.accessToken);
          console.log(res?.data?.result?.accessToken);
          toast.success('Log in success', {
            position: 'top-left',
          });
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className={cn('grid gap-6 space-y-4', className)} {...props}>
      <Form {...form}>
        <form method="POST" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
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
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} className="w-full text-white bg-primary hover:bg-primary/90">
            {isLoading ? 'Loading...' : 'Login'}
          </Button>
        </form>
      </Form>
    </div>
  );
}

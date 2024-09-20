'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppDispatch } from '@/hooks/useRedux';
import { sendEmail, setEmail } from '@/lib/redux/forgotPasswordSlice';
import { cn } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface ForgotPassFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formLoginSchema = z.object({
  email: z.string().email({
    message: 'Email không hợp lệ',
  }),
});

export function ForgotPassForm({ className, ...props }: ForgotPassFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  
  const dispatch = useAppDispatch();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formLoginSchema>) {
    setIsLoading(true);
    const link = '';
    dispatch(setEmail({ email: values.email }));
    dispatch(sendEmail({ email: values.email, link: link })).finally(() => {
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
          <Button disabled={isLoading} className="w-full text-white bg-primary hover:bg-primary/90">
            {isLoading ? 'Loading...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  );
}

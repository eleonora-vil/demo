import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAppDispatch } from '@/hooks/useRedux';
import { createTraineeFirstStep, firstStepData, firstStepResponse } from '@/lib/api/create-trainee/first-step';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const formSchema = z.object({
  email: z.string().min(1, { message: 'email is required' }).email({ message: 'Invalid email address.' }),
});

export function CreateTraineeForm() {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleFirstStep = async (firstStepData: firstStepData) => {
    const response: firstStepResponse = (await createTraineeFirstStep(firstStepData)) as firstStepResponse;
    if (response && response?.success) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const link = `http://localhost:5173/verify?email=`;
    const firstStepData: firstStepData = {
      email: values.email,
      link: link,
    };
    handleFirstStep(firstStepData).then(() => {
      form.reset();
    });
  }

  return (
    <Card className="p-8 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="a@gmail.com" {...field} className="bg-slate-50" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2">
            <Button disabled={isLoading} type="button" className="hover:bg-red-200 bg-primary-foreground text-red-500">
              <Link to="/user-management">Cancel</Link>
            </Button>
            <Button disabled={isLoading} type="submit" className="text-blue-500 bg-blue-200 hover:bg-blue-300 ">
              {isLoading ? 'Loading...' : 'Create'}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}

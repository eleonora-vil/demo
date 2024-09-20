import { Button } from '@/components/ui/button';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAppDispatch } from '@/hooks/useRedux';
import { addRow } from '@/lib/redux/createTraineeSlice';

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email',
  }),
});

export default function ImportManualTrainee() {
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    dispatch(addRow({ email: values.email }));
    form.reset();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="my-2">
              <Label className="text-lg" htmlFor="email">
                Add One
              </Label>
              <FormControl>
                <div className="flex gap-2 items-center">
                  <div className="relative flex-1">
                    <FormMessage className="absolute right-4 top-1/2 -translate-y-1/2" />
                    <Input placeholder="abc@gmail.com" {...field} id="email" />
                  </div>
                  <Button type="submit" className="w-32">
                    Add
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

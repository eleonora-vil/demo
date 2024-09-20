import { useNavigate, useSearchParams } from 'react-router-dom';
import OtpConfirmLayout from './layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { GetOtpEndTimeResponse, getOtpEndTime } from '@/lib/api/create-trainee/get-otp-end-time';
import { RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';
import { createTraineeFirstStep, firstStepData, firstStepResponse } from '@/lib/api/create-trainee/first-step';
import { minuteSecondFormat } from '@/utils/minute-second-format';
import { set } from 'date-fns';
import { submitOtp, submitOtpResponse } from '@/lib/api/create-trainee/submit-otp';
import { useAppDispatch } from '@/hooks/useRedux';
import { setStepCompleted } from '@/lib/redux/verify-step';
import { setEmail } from '@/lib/redux/verify-user';
import { ResendOtpData, ResendOtpResponse, resendOtp } from '@/lib/api/create-trainee/resend-otp';

const otpRegex = /^\d{6}$/;

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  otp: z.string().length(6, 'Please enter a valid OTP').regex(otpRegex, 'Please enter a valid OTP'),
});

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const [otpEndTime, setOtpEndTime] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email || '',
      otp: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const submitData = {
      email: values.email,
      otp: values.otp,
    };
    setIsSubmitLoading(true);
    const response = await submitOtp(submitData);
    const submitResponse: submitOtpResponse = response as submitOtpResponse;
    if (submitResponse.success) {
      toast.success(submitResponse.result.message);
      setIsSubmitLoading(false);
      dispatch(setStepCompleted(0));
      dispatch(setEmail({ email: values.email }));
    } else {
      toast.error(submitResponse.result.message);
      setIsSubmitLoading(false);
    }
  }

  const handleGetOtpEndTime = async (email: string) => {
    const response: GetOtpEndTimeResponse = (await getOtpEndTime(email)) as GetOtpEndTimeResponse;
    if (response.success) {
      setOtpEndTime(new Date(response.result.endTime));
    }
  };

  const handleFirstStep = async (firstStepData: firstStepData) => {
    const response: firstStepResponse = (await createTraineeFirstStep(firstStepData)) as firstStepResponse;
    if (response && response?.success) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (email) {
      setIsLoading(true);
      const link = `http://localhost:5173/verify?email=${email}`;
      const resendData: ResendOtpData = {
        email: email,
        link: link,
      };
      try {
        const response: ResendOtpResponse = (await resendOtp(resendData)) as ResendOtpResponse;
        if (response.success) {
          toast.success(response.result.message);
          setIsLoading(false);
          handleGetOtpEndTime(email);
        } else {
          toast.error(response.result.message);
          setIsLoading(false);
        }
      } catch (error: any) {
        if (error.response.data.success === false) {
          toast.error(error.response.data.result.message);
        }
        setIsLoading(false);
      }
    } else {
      toast.error('Please enter a valid email address to resend OTP.');
    }
  };

  useEffect(() => {
    if (email) {
      handleGetOtpEndTime(email);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const difference = (otpEndTime?.getTime() ?? 0) - new Date().getTime();
      if (difference > 0) {
        setTimeLeft(Math.floor(difference / 1000));
      } else {
        setTimeLeft(null);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [otpEndTime]);

  return (
    <div>
      <Card className="">
        <CardHeader>
          <CardDescription>{email ? <div>Enter the OTP and password sent to {email}</div> : <div>Enter the OTP and password sent to your email</div>}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between w-full">
                      <FormLabel>Email</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between w-full">
                      <FormLabel>OTP</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input placeholder="otp" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="w-full flex justify-between">
                <div>
                  {otpEndTime && (
                    <div className="h-full flex items-center">
                      {timeLeft ? (
                        <div className=" px-4 rounded-md text-red-500 bg-red-200 h-full flex items-center">Time left: {minuteSecondFormat(timeLeft)}</div>
                      ) : (
                        <div>
                          {isLoading ? (
                            <Button className="w-full flex items-center gap-2 bg-blue-200 text-blue-500" type="button" disabled>
                              <RefreshCw size={16} className="animate-spin" />
                              Resending OTP
                            </Button>
                          ) : (
                            <Button className="w-full flex items-center gap-2 bg-blue-200 text-blue-500 hover:bg-blue-300" type="button" onClick={() => handleResendOtp()}>
                              <RefreshCw size={16} />
                              Resend OTP
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

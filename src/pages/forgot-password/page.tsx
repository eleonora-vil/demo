import React from 'react';
import AuthenticationLayout from '../register/AuthenticationLayout';
import { Link } from 'react-router-dom';
import { ForgotPassForm } from './components/form/forgot-pass-form';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { OtpSubmit } from './components/form/otp-submit';
import { ChangePassword } from './components/form/change-password';
import { resetState } from '@/lib/redux/forgotPasswordSlice';

export default function ForgotPassword() {
  const { isEmailSubmitSuccessful, isOTPSubmitSuccessful } = useAppSelector((state) => state.forgotPass);

  const dispatch = useAppDispatch();

  const handleResetState = () => {
    dispatch(resetState());
  };

  return (
    <AuthenticationLayout>
      <div className="lg:p-8 relative">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">FAMS Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              {isEmailSubmitSuccessful ? <div>Enter OTP code that sended to your </div> : <div>Enter your email to reset your password</div>}
            </p>
          </div>
          {isEmailSubmitSuccessful ? isOTPSubmitSuccessful ? <ChangePassword /> : <OtpSubmit /> : <ForgotPassForm />}
          <p className="px-8 text-center text-sm text-muted-foreground">
            Back to login?{' '}
            <Link to="/login" className="underline underline-offset-4 text-blue-500 hover:text-blue-600 font-normal" onClick={handleResetState}>
              Login
            </Link>
            .
          </p>
        </div>
      </div>
    </AuthenticationLayout>
  );
}

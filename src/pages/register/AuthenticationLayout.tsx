import React from 'react';
// import Background from "@/assets/hero.jpg";
import Background from '@/assets/FU.jpeg';
import LoginProtectedRoute from '@/hooks/ProtectedLogin';

export default function AuthenticationLayout({ children }: { children: React.ReactNode }) {
  return (
    <LoginProtectedRoute>
      <div className="font-geist w-screen h-screen flex">
        <div className="flex-1 hidden md:block">
          <img src={Background} alt="auth-background" className="w-full h-full object-cover " />
        </div>
        <div className="flex-1 flex items-center justify-center">{children}</div>
      </div>
    </LoginProtectedRoute>
  );
}

import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import AccessDenied from '@/assets/403.svg';
import { useEffect, useState } from 'react';
export default function AccesDeniedPage() {
  const [count, setCount] = useState<number>(5);
  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      setCount((prevCount) => {
        if(prevCount === 0) return 0
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    if (count === 0 || count < 0) {
      navigate('/');
    }
  }, [count]);

  return (
    <div id="access-denied-page">
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className=" mx-auto w-[300px] h-[300px]">
          <img src={AccessDenied} alt="Error" className="w-full h-full object-cover" />
        </div>
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Access Denied</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">You dont have permission to access this page</p>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Redirecting to home in <span className="text-2xl text-red-500"> {count}</span> seconds
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button>
              <Link to={'/'}>Go back home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

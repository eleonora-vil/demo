import { Button } from '@/components/ui/button';
import { Link, useRouteError } from 'react-router-dom';
import Error from '@/assets/empty.svg';
import { useEffect } from 'react';
export default function ErrorServerPage() {
  const error = useRouteError();
  console.error(error);
  useEffect(() => {
    document.title = "Error - FAMS"
  }, [])
  return (
    <div id="error-page">
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className=" mx-auto w-[400px] h-[400px]">
          <img src={Error} alt="Error" className="w-full h-full object-cover" />
        </div>
        <div className="text-center">
          <p className="text-4xl font-semibold text-primary">500</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Internal Server</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Sorry, our server have some problems.</p>
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

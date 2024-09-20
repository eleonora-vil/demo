import { useAppSelector } from '@/hooks/useRedux';
import CreateManyTrainee from './components/create-many-trainee';
import Loading from '@/components/loading';
import { useEffect } from 'react';

export default function CreateTraineePage() {
  const { isLoading, data, successCount } = useAppSelector((state) => state.createTrainee);
  useEffect(() => {
    document.title = "Create Trainee - FAMS"
  }, [])
  return (
    <div className="px-4 pt-8">
      <section className="text-xl font-bold flex justify-between items-center">
        <h1>Create Trainee</h1>
      </section>
      <section className="mt-4">
        <CreateManyTrainee />
      </section>
      <section>{isLoading && <Loading />}</section>
    </div>
  );
}

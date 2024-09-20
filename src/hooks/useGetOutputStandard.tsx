import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getOutputStandard as getOutputStandardApi } from '@/lib/api/outputStandardApi';

const useGetOutputStandard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [outputStandard, setOutputStandard] = useState<any>();

  const getOutputStandard = async (id: string) => {
    setIsLoading(true);
    try {
      const result = await getOutputStandardApi(id);
      setOutputStandard(result.data.result.outputStandardModel);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, outputStandard, getOutputStandard };
};

export default useGetOutputStandard;

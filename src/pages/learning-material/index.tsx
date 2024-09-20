import React, { useEffect, useState } from 'react';
import { getAllSyllabuses } from '@/lib/api/syllabus-detail-api';
import { toast } from 'react-toastify';
import { useAppSelector } from '@/hooks/useRedux';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import Loading from '@/components/loading';

interface Syllabus {
  syllabusId: number;
  name: string;
  slot: number;
  version: string;
  createdDate: string;
  inStructorName: string;
}

export default function LearningMaterialPage() {
  const [syllabuses, setSyllabuses] = useState<Syllabus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isRender = useAppSelector((state) => state.isTableRender.isRender);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading state to true before fetching data
        const res = await getAllSyllabuses();
        if (res.error != null) {
          toast.error('Get data Unsuccessfully !', {
            position: 'top-left',
          });
        } else {
          setSyllabuses(res?.data?.result?.syllabus || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching data
      }
    };
    fetchData();
  }, [isRender]); // Fetch data whenever isRender changes

  return (
    <div className="py-3 px-10">
      <div className="text-3xl font-bold text-black mt-4">Learning Material</div>
      {!isLoading ? (
        syllabuses.map((syllabus, index) => (
          <Card className="flex space-y-0  w-full rounded-2xl text-nowrap px-6 py-3  mb-2 mt-5" key={`new-syllabus-${index}`}>
            <div className="flex-1">
              <div className="font-semibold font-inter text-xl text-primary cursor-pointer" onClick={() => navigate(`/learning-materials/${syllabus?.syllabusId || ''}`)}>{syllabus?.name}</div>
              <div className="text-[12px] space-y-0 pb-0 font-semibold text-[#8B8B8B]">NPL {syllabus.version}</div>
              <div className="text-[14px]">
                Modified on {format(new Date(syllabus?.createdDate), 'PPP')} by {syllabus?.inStructorName}
              </div>
            </div>
            <div className="flex flex-col items-center justify-between text-sm">
              <div>({syllabus?.slot} slot)</div>
              <Button onClick={() => navigate(`/learning-materials/${syllabus?.syllabusId || ''}`)}>View</Button>
            </div>
          </Card>
        ))
      ) : (
        <div className="w-full h-80 flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
}

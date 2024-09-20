/* eslint-disable @typescript-eslint/no-explicit-any */

import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { useAppSelector } from '@/hooks/useRedux';
import { getMana } from '@/lib/api/dashboard-api';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const NewSyllabus = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isRender = useAppSelector((state) => state.isTableRender.isRender);
  const navigate = useNavigate();

  const refreshData = () => {
    getMana()
      .then((res) => {
        if (res.error != null) {
          // handle error
        } else {
          setData(res.data?.result?.manaModel);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    refreshData();
  }, [isRender]);

  return (
    <div>
      {!isLoading &&
        data &&
        data.listSyllabus &&
        data.listSyllabus.map((item: any, index: number) => {
          return (
            <Card className="flex space-y-0  w-full rounded-2xl text-nowrap px-6 py-3  mb-2" key={`new-syllabus-${index}`}>
              <div className="flex-1">
                <div className="font-semibold font-inter text-xl text-primary">
                  {item?.name}
                </div>
                <div className="text-[12px] space-y-0 pb-0 font-semibold text-[#8B8B8B]">
                  NPL {item.version}
                </div>
                <div className="text-[14px]">
                  Modified on {format(new Date(item?.createdDate), "PPP")} by{" "}
                  {item?.inStructorName}
                </div>
              </div>
              <div className="flex flex-col items-center justify-between text-sm">
                <div>({item?.slot} slot)</div>
                <Button
                  onClick={() =>
                    navigate(`/syllabus/${item?.syllabusId || ""}`)
                  }
                >
                  View
                </Button>
              </div>
            </Card>
          );
        })}
      {isLoading && (
        <div className="w-full h-80 flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

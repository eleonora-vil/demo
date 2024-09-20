import Typography from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/DateUtils';
import { XCircleIcon } from 'lucide-react';
import React from 'react';

const SyllabusAddedItem = ({ syllabusDetail, value, method, index }: any) => {
  const deleteSyllabus = () => {
    const newList = value;
    newList.splice(index, 1);
    console.log(newList);

    method([...newList]);
  };
  console.log(value);

  return (
    <div className='shadow border border-gray-300 w-4/5 rounded-md p-5'>
      <div className='flex flex-row justify-between pb-3'>
        <Typography type='h2'>{syllabusDetail?.name || "NO Name"} </Typography>
        <Button onClick={() => deleteSyllabus()}>
          <XCircleIcon />
        </Button>
      </div>
      <div className='flex flex-row justify-between'>
        <div>
          <strong>{syllabusDetail?.code} v{syllabusDetail?.version}</strong><span className='mx-2'> &bull; </span><span>Modified on {formatDate(new Date(syllabusDetail?.createdDate))} by null</span>
        </div>
        <strong>
          ({syllabusDetail?.slot} SLOTS)
        </strong>
      </div>
    </div>
  );
};

export default SyllabusAddedItem;

import Typography from '@/components/Typography'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/utils/DateUtils';
import { useNavigate } from 'react-router-dom'

const ViewItem = ({ syllabusDetail }: any) => {
  const navigator = useNavigate();

  return (
    <div className='shadow border border-gray-300 w-4/5 rounded-md p-5  '>
        <div className='flex flex-row justify-between pb-3'>
           <Typography type='h2' className="max-w-[600px] overflow-clip">{syllabusDetail?.name||"NO Name"} </Typography>
           <Button onClick={()=> navigator(`/syllabus/${syllabusDetail.syllabusId}`)}>View</Button>
        </div>
        <div className='flex flex-row justify-between'>
            <div>
                <strong>{syllabusDetail?.code} v{syllabusDetail?.version}</strong><span className='mx-2'> &bull; </span><span>Modified on {formatDate(new Date(syllabusDetail?.createdDate))} </span>
            </div>
            <strong>
                ({syllabusDetail?.slot} SLOTS)
            </strong>
        </div>
    </div>
  );
};

export default ViewItem;

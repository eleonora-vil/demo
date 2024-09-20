import { formatDate } from '@/utils/DateUtils';
import { ZapOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const LearningMaterial = ({ materials }: any) => {
  if (materials.length == 0) return <div className='p-2 flex gap-2 text-primary font-bold items-center bg-slate-200 ms-10 mt-3 rounded-sm justify-center py-8'><ZapOff  /> No materials </div>;
  return (
    <div className="ms-10 mt-3 bg-slate-200 rounded-sm p-3">
      {materials.map((material: any, i: number) => {
        return (
          <div className="flex justify-between" key={`learning-material-${i}`}>
            <Link to={material.url ? material.url : '/'} className="text-blue-600 underline">
              {material.name}
            </Link>{' '}
            <div className="italic">
              by {material.createBy} on {formatDate(new Date(material.createDate))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LearningMaterial;

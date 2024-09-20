/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDate } from '@/utils/DateUtils';
import { Link } from 'react-router-dom';

const LearningMaterial = ({ materials }: any) => {
  return (
    <div className="ms-10 mt-3 bg-slate-200 rounded-lg p-3">
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

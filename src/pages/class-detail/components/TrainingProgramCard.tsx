import { formatDate } from '@/utils/DateUtils';

// type TrainerType = {
//   id: number;
//   name: string;
//   profileURL: string;
// };
type TrainingProgramCardPropsType = {
  syllabusName: string;

  syllabusStatus: string;
  syllabusShortName: string;

  createdAt: Date;
  version: string;
};
const TrainingProgramCard = ({
  syllabusName,
  syllabusStatus,
  syllabusShortName,

  createdAt,
  version,
}: TrainingProgramCardPropsType) => {
  return (
    <div className="flex shadow-[0px_0px_15px_rgba(0,0,0,0.3)] rounded-xl overflow-hidden">
      <div className={`p-5 ${syllabusStatus === 'Inactive' ? 'opacity-50' : ''}`}>
        <div className="flex gap-5 items-center mb-3">
          <a className="text-3xl font-semibold text-primary tracking-widest">{syllabusName}</a>
          <div className="bg-primary text-white px-3 py-1 rounded-3xl">{syllabusStatus}</div>
        </div>
        <div className="flex items-center">
          <div>{syllabusShortName}</div>
          <div className="border border-primary mx-4 h-4" />
          <div>v{version}</div>
          <div className="border border-primary mx-4 h-4" />
          <div>
            Create on <span className="italic">{formatDate(createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingProgramCard;

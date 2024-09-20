import { formatDate } from '@/utils/DateUtils';
import { courses } from '@/pages/class-detail/data/data';
import TrainingProgramCard from './TrainingProgramCard';
import DocumentManageIcons from '@/components/icons/document-manage-icons';
import { Link } from 'react-router-dom';
const TrainingProgram = () => {
  return (
    <div>
      <div className="bg-primary text-white px-10 py-5 mb-3">
        <div className="w-full h-9 justify-start items-start gap-2.5 inline-flex">
          <div className="justify-start items-center gap-5 flex">
            <div className="text-white text-2xl font-semibold font-['Inter'] leading-9 tracking-[4.80px]">DevOps Foundation</div>
            <Link to="/class/create/classdetail/next">
              <div className="w-6 h-6 relative ">
                <DocumentManageIcons icon="create" />
              </div>
            </Link>
          </div>
        </div>
        <div className="flex">
          <div>
            31 days <span className="italic">(97 hours)</span>
          </div>
          <div className="border border-white mx-5"></div>
          <div>
            Modified on {formatDate(new Date('2022-07-23'))} by <span className="font-bold">Warior Tran</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {courses.map((course, index) => (
          <TrainingProgramCard
            key={`traning-program-card-${index}`}
            syllabusName={course.syllabusName}
            syllabusShortName={course.syllabusShortName}
            syllabusURL={course.syllabusURL}
            syllabusStatus={course.syllabusStatus}
            createdAt={new Date(course.createdAt)}
            createdBy={course.createdBy}
            duration={course.duration}
            trainers={course.trainer}
          />
        ))}
      </div>
      <div className="p-3 bg-primary mt-3 rounded-b-xl"></div>
    </div>
  );
};

export default TrainingProgram;

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { formatDate } from "@/utils/DateUtils";

// type TrainerType = {
//   id: number;
//   name: string;
//   profileURL: string;
// };
// type TrainingProgramCardPropsType = {
//   syllabusName: string;
//   syllabusURL: string;
//   syllabusStatus: string;
//   syllabusShortName: string;
//   duration: {
//     days: number;
//     hours: number;
//   };
//   createdAt: Date;
//   createdBy: string;
//   trainers: TrainerType[];
// };
// const TrainingProgramCard = ({
//   syllabusName,
//   syllabusURL,
//   syllabusStatus,
//   syllabusShortName,
//   duration,
//   createdAt,
//   createdBy,
//   trainers,
// }: TrainingProgramCardPropsType) => {
//   return (
//     <div className="flex shadow-[0px_0px_15px_rgba(0,0,0,0.3)] rounded-xl overflow-hidden">
//       <div className="bg-primary grid grid-cols-3 px-8 py-4 gap-2 items-center">
//         {trainers.map((trainer) => (
//           <Avatar className="h-16 w-16">
//             <AvatarImage src={trainer.profileURL} />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//         ))}
//       </div>
//       <div
//         className={`p-5 ${syllabusStatus === "Inactive" ? "opacity-50" : ""}`}
//       >
//         <div className="flex gap-5 items-center mb-3">
//           <a
//             className="text-3xl font-semibold text-primary tracking-widest"
//             href={syllabusURL}
//           >
//             {syllabusName}
//           </a>
//           <div className="bg-primary text-white px-3 py-1 rounded-3xl">
//             {syllabusStatus}
//           </div>
//         </div>
//         <div className="flex items-center">
//           <div>
//             {syllabusShortName}
//           </div>
//           <div className="border border-primary mx-4 h-4"/>
//           <div>
//             {duration.days} days <span className="italic">({duration.hours} hours)</span>
//           </div>
//           <div className="border border-primary mx-4 h-4"/>
//           <div>
//             on <span className="italic">{formatDate(createdAt)}</span> by {createdBy}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrainingProgramCard;
import OtherIcons from '@/components/icons/other-icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatDate } from '@/utils/DateUtils';

type TrainerType = {
  id: number;
  name: string;
  profileURL: string;
};
type TrainingProgramCardPropsType = {
  syllabusName: string;
  syllabusURL: string;
  syllabusStatus: string;
  syllabusShortName: string;
  duration: {
    days: number;
    hours: number;
  };
  createdAt: Date;
  createdBy: string;
  trainers: TrainerType[];
};
const TrainingProgramCard = ({ syllabusName, syllabusURL, syllabusStatus, syllabusShortName, duration, createdAt, createdBy, trainers }: TrainingProgramCardPropsType) => {
  return (
    <div className="flex shadow-[0px_0px_15px_rgba(0,0,0,0.3)] rounded-xl overflow-hidden">
      <div className="bg-primary grid grid-cols-3 px-8 py-4 gap-2 items-center">
        <TooltipProvider>
          {trainers.map((trainer, index) => (
            <Tooltip key={`trainer-${index}`}>
              <TooltipTrigger>
                <Avatar className="h-16 w-16">
                  <AvatarImage src={trainer.profileURL} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p className="flex gap-2">
                  <OtherIcons icon="call" className="text-blue-700" /> 097899084
                </p>
                <p className="flex gap-2">
                  <OtherIcons icon="mail" className="text-blue-700" />
                  TrungDVQ@fsoft.com.vn
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
      <div className={`p-5 ${syllabusStatus === 'Inactive' ? 'opacity-50' : ''}`}>
        <div className="flex gap-5 items-center mb-3">
          <a className="text-3xl font-semibold text-primary tracking-widest" href={syllabusURL}>
            {syllabusName}
          </a>
          <div className="bg-primary text-white px-3 py-1 rounded-3xl">{syllabusStatus}</div>
        </div>
        <div className="flex items-center">
          <div>{syllabusShortName}</div>
          <div className="border border-primary mx-4 h-4" />
          <div>
            {duration.days} days <span className="italic">({duration.hours} hours)</span>
          </div>
          <div className="border border-primary mx-4 h-4" />
          <div>
            on <span className="italic">{formatDate(createdAt)}</span> by {createdBy}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingProgramCard;

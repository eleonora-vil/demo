{
  /*MAIN CODE HAVE PROPS*/
}

// import React from 'react';
// import { Badge } from '../ui/badge';
// import { User } from '@/types/user';
// import ActionIcons from '../icons/action-icons';
// interface SyllabusCardProps {
//   syllabusTitle: string;
//   syllabusTag: string;
//   syllabusCode: string;
//   syllabusDuration: string;
//   modifyDate: string;
//   createBy: string;
// }
// function SyllabusCard({  syllabusTitle,
//   syllabusTag,
//   syllabusCode,
//   syllabusDuration,
//   modifyDate,
//   createBy
// }:SyllabusCardProps){
//   return (
//     <div className="p-10">
//       <p className="font-bold text-lg">Syllabus card</p>
//       <div className="mt-5 h-24 w-full border-spacing-4 rounded-2xl bg-white shadow-md shadow-gray-400 text-nowrap">
//         <div className="p-5">
//           <div className="gap-5 flex items-center">
//             <p className="tracking-widest font-semibold font-inter text-2xl text-[#2D3748]">{syllabusTitle}</p>
//             <Badge className="py-1 px-4 h-6 w-18">{syllabusTag}</Badge>
//           </div>
//           <div className="flex text-sm leading-5.5 mt-2.5 font-semibold">
//             <p>{syllabusCode}</p>
//             <span className="mx-2.5">|</span>
//             <p>{syllabusDuration}</p>
//             <span className="mx-2.5">|</span>
//             <p>Modified on {modifyDate} by {createBy}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SyllabusCard;

{
  /*DEMO CODE NO PROPS*/
}

import { Badge } from '../ui/badge';
import ActionIcons from '../icons/action-icons';
export default function SyllabusCard() {
  return (
    <div className="p-10">
      <p className="font-bold text-lg">Syllabus card</p>
      {/* 1 */}
      <div className="mt-5 h-24 w-full border-spacing-4 rounded-2xl bg-white shadow-md shadow-gray-400 text-nowrap">
        <div className="p-5">
          <div className=" gap-5 flex items-center">
            {/*syllabusTitle*/}
            <p className="tracking-widest font-semibold font-inter text-2xl text-[#2D3748] ">Linux</p>
            {/* syllabusTag */}
            <Badge className=" py-1 px-4 h-6 w-18 ">Active</Badge>
          </div>
          <div className="flex text-sm leading-5.5 mt-2.5 font-semibold">
            {/* syllabusCode */}
            <p>LIN v.20</p>
            <span className="mx-2.5">|</span>
            {/* syllabusDuration */}
            <p>4 days (12 hours)</p>
            <span className="mx-2.5">|</span>
            {/* modifyDate and createBy */}
            <p>Modified on 23/07/2022 by Johny Deep</p>
          </div>
        </div>
      </div>
      {/* 2 */}
      <div className="mt-5 h-24 w-full border-spacing-4 rounded-2xl bg-white shadow-md shadow-gray-400 text-nowrap">
        <div className="p-5">
          <div className=" gap-5 flex items-center ">
            <p className="tracking-widest font-semibold font-inter text-2xl text-[#8B8B8B] ">Linux</p>
            <Badge className="  h-6 w-18 bg-[#8B8B8B] ">Inactive</Badge>
          </div>
          <div className="flex text-sm leading-5.5 mt-2.5 font-semibold text-[#8B8B8B]">
            <p>LIN v.20</p>
            <span className="mx-2.5">|</span>
            <p>4 days (12 hours)</p>
            <span className="mx-2.5">|</span>
            <p>Modified on 23/07/2022 by Johny Deep</p>
          </div>
        </div>
      </div>
      {/* 3 */}
      <div className="mt-5 h-24 w-full border-spacing-4 rounded-2xl bg-white shadow-md shadow-gray-400 text-nowrap">
        <div className="p-5">
          <div className=" gap-5 flex items-center relative">
            <p className="tracking-widest font-semibold font-inter text-2xl text-[#2D3748] ">Linux</p>
            <Badge className=" py-1 px-4 h-6 w-18  ">Active</Badge>
            <ActionIcons icon="cancel" className="absolute top-0 right-0" />
          </div>
          <div className="flex text-sm leading-5.5 mt-2.5 font-semibold">
            <p>LIN v.20</p>
            <span className="mx-2.5">|</span>
            <p>4 days (12 hours)</p>
            <span className="mx-2.5">|</span>
            <p>Modified on 23/07/2022 by Johny Deep</p>
          </div>
        </div>
      </div>
      {/* 4 */}
      <div className="mt-5 h-24 w-full border-spacing-4 rounded-2xl bg-[#DFDEDE] shadow-md shadow-gray-400 text-nowrap">
        <div className="p-5">
          <div className=" gap-5 flex items-center relative">
            <p className="tracking-widest font-semibold font-inter text-2xl text-[#2D3748] ">Linux</p>
            <Badge className="  py-1 px-4 h-6 w-18 border-white border-2 ">Active</Badge>
            <ActionIcons icon="cancel" className="absolute top-0 right-0" />
          </div>
          <div className="flex text-sm leading-5.5 mt-2.5 font-semibold">
            <p>LIN v.20</p>
            <span className="mx-2.5">|</span>
            <p>4 days (12 hours)</p>
            <span className="mx-2.5">|</span>
            <p>Modified on 23/07/2022 by Johny Deep</p>
          </div>
        </div>
      </div>
      {/* 5 */}
      <div className="mt-5 h-24 w-full border-spacing-4 rounded-2xl bg-white shadow-md shadow-gray-400 text-nowrap">
        <div className="p-5">
          <div className=" gap-5 flex items-center relative">
            <p className="tracking-widest font-semibold font-inter text-2xl text-[#8B8B8B] ">Linux</p>
            <Badge className=" h-6 w-18 bg-[#8B8B8B] ">Inactive</Badge>
            <ActionIcons icon="cancel" className="absolute top-0 right-0" />
          </div>
          <div className="flex text-sm leading-5.5 mt-2.5 font-semibold text-[#8B8B8B]">
            <p>LIN v.20</p>
            <span className="mx-2.5">|</span>
            <p>4 days (12 hours)</p>
            <span className="mx-2.5">|</span>
            <p>Modified on 23/07/2022 by Johny Deep</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import ActionIcons from '@/components/icons/action-icons';
import { Badge } from '@/components/ui/badge';
import React from 'react';

export const CreateNextViewClassPage = () => {
  return (
    <div>
      <div>
        <div className="w-full h-[130px] p-5 bg-white border-b border-gray-700 flex-col justify-center items-start gap-2.5 inline-flex">
          <div className="text-gray-700 text-2xl font-semibold font-['Inter'] leading-9 tracking-[4.80px]">Training program of Fresher Develop Operation</div>
          <div className="w-[1142px] h-11 pr-[30px] justify-between items-start inline-flex">
            <div className="justify-start items-center gap-5 flex">
              <div className="text-gray-700 text-[32px] font-semibold font-['Inter'] leading-[48px] tracking-[6.40px]">DevOps Foundation</div>
              <div className="w-[72px] h-[27px] px-[15px] py-[5px] bg-zinc-400 rounded-[50px] border border-white justify-center items-center flex">
                <div className="text-white text-xs font-medium font-['Inter'] leading-[18px]">Inactive</div>
              </div>
            </div>
            <button>
              <ActionIcons icon="more-horizontal" className="w-12 h-12" />
            </button>
          </div>
        </div>
        <div className="w-full h-[86px] p-5 flex-col justify-center items-start gap-[5px] inline-flex">
          <div className="w-[268px] justify-start items-baseline gap-[5px] inline-flex">
            <div className="text-black text-2xl font-semibold font-['Inter'] leading-9 tracking-[4.80px]">31</div>
            <div className="text-black text-base font-medium font-['Inter'] leading-normal">days</div>
            <div className="text-black text-base font-normal font-['Inter'] leading-normal">(97 hours)</div>
          </div>
          <div className="text-black text-sm font-medium font-['Inter'] leading-snug">Modified on 21/07/2022 by Warrior Tran </div>
        </div>
        <div className="w-[1172px] h-[846px] px-5 flex-col justify-start items-start gap-5 inline-flex">
          <div className="self-stretch pt-2.5 justify-start items-start gap-2.5 inline-flex">
            <div className="text-black text-base font-semibold font-['Inter'] leading-normal">Content</div>
          </div>

          <div className="mt-5 h-24 w-full border-spacing-4 rounded-2xl bg-white shadow-md shadow-gray-400 text-nowrap">
            <div className="p-5">
              <div className=" gap-5 flex items-center relative">
                <p className="tracking-widest font-semibold font-inter text-2xl text-[#8B8B8B] ">Linux</p>
                <Badge className=" h-6 w-18 bg-[#8B8B8B] ">Inactive</Badge>
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
      </div>
    </div>
  );
};

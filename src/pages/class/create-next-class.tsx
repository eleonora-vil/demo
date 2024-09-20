import ActionIcons from '@/components/icons/action-icons';
import DocumentManageIcons from '@/components/icons/document-manage-icons';
import SearchBox from '@/components/search-box';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ModalCreateClass } from './components/ModalCreateClass';

export const CreateNextClassPage = () => {
  return (
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

        {/* <div className="self-stretch h-24 py-2.5 bg-gray-700 rounded-[40px] shadow justify-start items-center inline-flex">
          <div className="w-[250px] h-24 px-4 bg-gray-700 rounded-tl-[20px] rounded-bl-[20px] justify-center items-center gap-[15px] flex">
            <div className="w-[47px] h-[47px] relative">
              <div className="w-[45.93px] h-[44.86px] left-[1.07px] top-[0.53px] absolute">
                <div className="w-[45.93px] h-[44.86px] left-0 top-0 absolute bg-stone-300 rounded-full"></div>
                <img
                  className="w-[45.93px] h-[45.93px] left-[-1.07px] top-[-0px] absolute"
                  src="https://via.placeholder.com/46x46"
                />
              </div>
              <div className="w-[47px] h-[47px] left-0 top-0 absolute bg-white bg-opacity-0 rounded-full border border-gray-700"></div>
            </div>
          </div>
          <div className="grow shrink basis-0 h-24 p-5 bg-white rounded-[20px] shadow flex-col justify-center items-start gap-2.5 inline-flex">
            <div className="self-stretch justify-between items-start inline-flex">
              <div className="justify-start items-center gap-5 flex">
                <div className="text-gray-700 text-2xl font-semibold font-['Inter'] leading-9 tracking-[4.80px]">
                  Docker
                </div>
                <div className="w-[72px] h-[27px] px-[15px] py-[5px] bg-gray-700 rounded-[50px] border border-white justify-center items-center flex">
                  <div className="text-white text-xs font-medium font-['Inter'] leading-[18px]">
                    Active
                  </div>
                </div>
              </div>
              <div className="w-6 h-6 relative"></div>
            </div>
            <div className="justify-start items-start gap-2.5 inline-flex">
              <div className="text-zinc-700 text-sm font-medium font-['Inter'] leading-snug">
                DOC v1.5
              </div>
              <div className="text-zinc-700 text-sm font-semibold font-['Inter'] leading-snug">
                |
              </div>
              <div>
                <span className="text-zinc-700 text-sm font-semibold font-['Inter'] leading-snug">
                  3 days{" "}
                </span>
                <span className="text-zinc-700 text-sm font-semibold font-['Inter'] leading-snug">
                  (12 hours)
                </span>
              </div>
              <div className="text-zinc-700 text-sm font-semibold font-['Inter'] leading-snug">
                |
              </div>
              <div className="text-zinc-700 text-sm font-semibold font-['Inter'] leading-snug">
                Modified on 23/07/2022 by Johny Deep
              </div>
            </div>
          </div>
        </div> */}
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

        <div className="flex gap-5">
          <ModalCreateClass />
          <span>or</span>

          <SearchBox icon={<DocumentManageIcons icon="search" />} />
        </div>
      </div>
      <div className="w-full h-28 p-5 justify-between items-center inline-flex">
        <Link to="/class/create/classdetail">
          <Button className="text-white text-sm font-bold font-['Inter'] leading-normal w-[84px] px-[25px] py-0.5 bg-gray-700 rounded-lg shadow justify-center items-center gap-[5px] flex">
            Back
          </Button>
        </Link>
        <div className="w-[331px] self-stretch p-5 justify-end items-center gap-2.5 flex">
          <Link to="/class/create/classdetail">
            <div className="w-12 py-0.5 rounded-lg justify-center items-center gap-[5px] flex">
              <div className="text-red-500 text-sm font-bold font-['Inter'] underline leading-normal">Cancel</div>
            </div>
          </Link>
          <Button className="w-[140px] px-[25px] py-0.5 bg-zinc-700 rounded-lg shadow justify-center items-center gap-[5px] flex text-white text-sm font-bold font-['Inter'] leading-normal">
            Save as draft{' '}
          </Button>
          <Link to="/class/create/classdetail/next/view">
            <Button className="w-[83px] px-[25px] py-0.5 bg-gray-700 rounded-lg shadow justify-center items-center gap-[5px] flex text-white text-sm font-bold font-['Inter'] leading-normal">
              Next
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

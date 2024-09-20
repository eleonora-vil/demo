import { Link, useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import ActionIcons from '@/components/icons/action-icons';
import { Tab } from '@/types/tab';
import { SyllabusTabs } from '@/components/syllabus-tab';
import GeneralTab from './GeneralTab/GeneralTab';
import OutlineTab from './OutlineTab/OutlineTab';
import OtherTab from './OtherTab/OtherTab';
import { useEffect } from 'react';
import { formatDate } from '@/utils/DateUtils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import DocumentManageIcons from '@/components/icons/document-manage-icons';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { RootState } from '@/lib/redux/store';
import Loading from '@/components/loading';
import NotFound from '@/components/error/NotFound';
import useGetSyllabusDetails from '@/hooks/useGetSyllabusDetails';

const MoreOptionButton = () => {
  const data = useAppSelector((state: RootState) => state.syllabusDetails.data);
  return (
    <Popover>
      <PopoverTrigger>
        <div className="w-7 h-7 rounded-full">
          <ActionIcons icon="more-horizontal" className="w-7 h-7" />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col">
          <h3 className="font-bold text-lg border-b border-b-slate-300 pb-1">Manage</h3>
          <Link to={`/syllabus/${data.syllabusId}/update`}>
            <button className="p-3 hover:bg-slate-300 text-left flex gap-2 w-full">
              <DocumentManageIcons icon="create" />
              Edit syllabus
            </button>
          </Link>
          <Link to="/">
            <button className="p-3 hover:bg-slate-300 text-left flex gap-2 w-full">
              <DocumentManageIcons icon="copy" />
              Duplicate syllabus
            </button>
          </Link>
          <Link to="/">
            <button className="p-3 hover:bg-slate-300 text-left flex gap-2 w-full">
              <ActionIcons icon="visibility-off" />
              De-activate syllabus
            </button>
          </Link>
          <div className="opacity-50">
            <button className="p-3 hover:bg-slate-300 text-left flex gap-2 w-full" disabled>
              <DocumentManageIcons icon="delete-forever" />
              Delete syllabus
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default function SyllabusDetailPage() {
  const data = useAppSelector((state: RootState) => state.syllabusDetails.data);
  const user = useAppSelector((store) => store.currentUser.user);
  
  const { id } = useParams<string>();
  const { isLoading, getSyllabusDetails } = useGetSyllabusDetails();
  useEffect(() => {
    if (id) {
      getSyllabusDetails(id);
    }
  }, []);

  useEffect(() => {
    if (data) {
      document.title = `${data.name} - FAMS`
    } else {
      document.title = `FAMS`
    }
  }, [data])

  const tabs: Tab[] = [
    {
      label: 'General',
      content: <GeneralTab />,
    },
    {
      label: 'Outline',
      content: <OutlineTab />,
    },
    {
      label: 'Other',
      content: <OtherTab />,
    },
  ];
  if (!isLoading && !data) {
    return <NotFound />;
  }
  if (isLoading) return <Loading />;
  return (
    <div className="w-full">
      {/* BEGIN Program header */}
      <div>
        <div className="py-3 px-8">
          <div className="text-[20px] pb-1 font-semibold tracking-[0.2em]">Syllabus</div>
          <div>
            <div className="w-full flex justify-between">
              <div className="flex items-center justify-between gap-3">
                <div className="text-[24px] font-bold tracking-wide text-4xl break-all">{data.name}</div>
                <div>
                  <Badge className="bg-primary py-1">{data.status}</Badge>
                </div>
              </div>
              <MoreOptionButton />
            </div>
          </div>
        </div>
        <div className="justify-between py-3 px-8 text-[16px] border-t border-b border-black flex">
          <div className="flex  gap-3">
            <span className="font-semibold">
              {data.code}  <span className="font-semibold">&bull;</span>v{data.version}
            </span>
            <span className="font-semibold">&bull;</span>
            <span>
              Modified on {formatDate(new Date(data.updatedDate))} by {user.fullName}
            </span>
          </div>
          <div className="font-semibold">({data.unit.length} slots)</div>
        </div>
      </div>
      {/* END Program header */}
      {/* BEGIN Syllabus Tabs */}
      <div className="px-5 w-full mt-5">
        <SyllabusTabs tabs={tabs} />
      </div>
      {/* END Syllabus Tabs */}
    </div>
  );
}

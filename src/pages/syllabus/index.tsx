import DocumentManageIcons from '@/components/icons/document-manage-icons';
import TitleBanner from '@/components/title-banner';
import { Button } from '@/components/ui/button';
import useAuthorized from '@/hooks/useAuthorized';
import { useAppSelector } from '@/hooks/useRedux';
import { getAllSyllabuses } from '@/lib/api/syllabus-detail-api';
import { format } from 'date-fns';
import { PlusCircle } from 'lucide-react';
import React, { useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { DataTable } from './components/data-table';
import { ImportModal } from './components/import-modal';
export default function UserManagementPage() {
  const [data, setData] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const isRender = useAppSelector((state) => state.isTableRender.isRender);
  const navigate = useNavigate();

  const isAccessable = useAuthorized({ requestTo: 'syllabus', actionType: 'create' });

  const refreshData = () => {
    setIsLoading(true); // Set loading to true when fetching data
    getAllSyllabuses()
      .then((res) => {
        if (res.error != null) {
          toast.error('Get data Unuccessfully !', {
            position: 'top-left',
          });
        } else {
          setData(res?.data?.result?.syllabus || []);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  console.log(data);
  useEffect(() => {
    refreshData();
  }, [isRender]);
  useEffect(() => {
    document.title = "Syllabus List - FAMS"
  }, [])
  
  const csvData = data
    .map((row: any) => ({
      syllabusId: row?.syllabusId,
      SyllabusName: row?.name || 'Name is null',
      Code: row?.code || 'Code is null',
      CreatedOn: row?.createdDate ? format(new Date(row.createdDate), 'PPP') : 'Created day is null',
      CreatedBy: row?.inStructorName || 'null',
      Duration: row?.slot || 'null',
      OupoutputStandards: row?.outputStandards && row.outputStandards.length > 0 ? row.outputStandards.map((standard: any) => standard.tags).join(', ') : 'null',
      status: row?.status || 'status is null',
    }))
    .sort((a: any, b: any) => a.syllabusId - b.syllabusId);
  return (
    <main className="space-y-2">
      <TitleBanner
        title={'Syllabus Listing'}
        component={[
          <ImportModal />,
          <CSVLink data={csvData} filename="syllabus_data.csv">
            <Button className="bg-primary text-white flex gap-2">
              {' '}
              <DocumentManageIcons icon="download" /> Export
            </Button>
          </CSVLink>,
          <Button className={`flex items-center gap-2  ${!isAccessable && 'hidden'} `} type="button" onClick={() => navigate('/syllabus/create')}>
            <PlusCircle size={20} />
            Add Syllabus
          </Button>,
        ]}
      />
      {/* <div className="flex justify-between gap-1 px-5">
        <PopupFilter /> 
        
      </div> */}
      <DataTable />
    </main>
  );
}

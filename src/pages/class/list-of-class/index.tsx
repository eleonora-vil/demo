import TitleBanner from '@/components/title-banner';

import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { DataTable } from './components/data-table';
import { CSVLink } from 'react-csv';
import { getAllClass } from '@/lib/api/class-api';
import { toast } from 'react-toastify';
import { useAppSelector } from '@/hooks/useRedux';
import { format } from 'date-fns';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DocumentManageIcons from '@/components/icons/document-manage-icons';
import useAuthorized from '@/hooks/useAuthorized';

export default function UserManagementPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = React.useState<any>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = React.useState(true);
  const isRender = useAppSelector((state) => state.isTableRender.isRender);
  const navigate = useNavigate();

  const refreshData = () => {
    setIsLoading(true); // Set loading to true when fetching data
    getAllClass()
      .then((res) => {
        if (res.error != null) {
          toast.error('Get data Unuccessfully !', {
            position: 'top-left',
          });
        } else {
          setData(res?.data?.result?.classes || []);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    refreshData();
  }, [isRender]);
  const csvData = data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((row: any) => ({
      ClassId: row?.classId,
      ClassName: row?.className || 'Name is null',
      ProgramId: row?.programId || 'Code is null',
      InstructorId: row?.instructorId || 'Instructor ID is null',
      StartDate: row?.startDate ? format(new Date(row.startDate), 'PPP') : 'Created day is null',
      EndDate: row?.endDate ? format(new Date(row.endDate), 'PPP') : 'Created day is null',
      Status: row?.status || 'status is null',
    }))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .sort((a: any, b: any) => a.classId - b.classId);
  useEffect(() => {
    document.title = 'Class List - FAMS';
  }, []);

  const isCreateAccessable = useAuthorized({ requestTo: 'class', actionType: 'create' });

  return (
    <main className="space-y-2 pb-12 ">
      {/* <TitleBanner title={'Class'} component={[<CreateClassModal />]} /> */}
      <TitleBanner
        title={'Class'}
        component={[
          <CSVLink data={csvData} filename="class_data.csv" key={1}>
            <Button className="bg-primary text-white flex gap-2">
              {' '}
              <DocumentManageIcons icon="download" /> Export
            </Button>
          </CSVLink>,
          <Button key={1} className={`flex items-center gap-2 ${isCreateAccessable ? '' : 'hidden'}`} type="button" onClick={() => navigate('/class/create')}>
            <PlusCircle size={20} />
            Add Class
          </Button>,
        ]}
      />
      <div className="flex justify-between gap-1 px-5">{/* <UpdateUserDialog /> */}</div>
      <DataTable />
    </main>
  );
}

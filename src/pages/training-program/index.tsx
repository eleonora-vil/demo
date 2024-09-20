import TitleBanner from '@/components/title-banner';
import { Button } from '@/components/ui/button';
import { DataTable } from './components/data-table';
import ActionIcons from '@/components/icons/action-icons';
import { useNavigate } from 'react-router-dom';
import DocumentManageIcons from '@/components/icons/document-manage-icons';
import { ImportModal } from './components/import-modal';
import React, { useEffect } from 'react';
import { useAppSelector } from '@/hooks/useRedux';
import { toast } from 'react-toastify';
import { getTrainingPrograms } from '@/lib/api/training-program-api';
import { format } from 'date-fns';
import { CSVLink } from 'react-csv';
import ExampleExcelFile from './components/example-excel-file';
import useAuthorized from '@/hooks/useAuthorized';

export default function TrainingProgramPage() {
  const navigator = useNavigate();
  const [data, setData] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const isRender = useAppSelector((state) => state.isTableRender.isRender);

  const refreshData = () => {
    setIsLoading(true); // Set loading to true when fetching data
    getTrainingPrograms()
      .then((res) => {
        if (res.error != null) {
          toast.error('Get data Unsuccessfully !', {
            position: 'top-left',
          });
        } else {
          setData(res?.data?.result?.trainingPrograms || []);
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
    .map((row: any) => ({
      ProgramId: row?.programId,
      ProgramName: row?.programName || 'Name is null',
      Description: row?.description || 'description is null',
      CreateOn: row?.startDate ? format(new Date(row.startDate), 'PPP') : 'startDate day is null',
      CreatedBy: row?.createBy || 'null',
      // Duration: row?.slot || "null",
      Status: row?.status || 'status is null',
    }))
    .sort((a: any, b: any) => a.programId - b.programId);
  useEffect(() => {
    document.title = `Training Program List - FAMS`;
  }, []);

  const isViewAccessable = useAuthorized({ requestTo: 'training-program', actionType: 'view' });
  const isCreateAccessable = useAuthorized({ requestTo: 'training-program', actionType: 'create' });

  return (
    <main className=" space-y-2">
      <TitleBanner
        title={'Training program'}
        component={[
          <ExampleExcelFile isAccessable={isCreateAccessable} />,
          <ImportModal isAccessable={isCreateAccessable} />,
          <CSVLink data={csvData} filename="traningprogram_data.csv">
            <Button className={`bg-primary text-white flex gap-2 ${isViewAccessable ? '' : 'hidden'}`}>
              {' '}
              <DocumentManageIcons icon="download" /> Export
            </Button>
          </CSVLink>,
          <Button className={`bg-primary text-white flex gap-2 ${isCreateAccessable ? '' : 'hidden'}`} onClick={() => navigator('/training-program/create')}>
            {' '}
            <ActionIcons icon="add" /> Create
          </Button>,
        ]}
      />
      <DataTable />
    </main>
  );
}

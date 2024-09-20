import { useEffect } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/myTable';
import { Card } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { checkEmailValidityAndExistence, setExistedEmail } from '@/lib/redux/createTraineeSlice';
import DataRow from './data-row';
import { getAllExistedEmails } from '@/lib/api/user-api';

export default function DisplayData() {
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.createTrainee);

  const handleGetAllEmails = async () => {
    const response = await getAllExistedEmails();
    if (response && response.data) {
      dispatch(setExistedEmail({ existedEmail: response.data }));
    }
  };

  useEffect(() => {
    console.log(data);
    dispatch(checkEmailValidityAndExistence());
  }, [data]);

  useEffect(() => {
    handleGetAllEmails();
  }, []);

  return (
    <Card className="w-full h-full overflow-y-auto border-slate-500 bg-slate-50">
      {data.length > 0 ? (
        <div className=" w-full h-full relative rounded-t-md ">
          {data.length > 0 ? (
            <Table>
              <TableHeader className="sticky top-0 bg-primary rounded-t-md ">
                <TableRow className="h-[50px] ">
                  <TableHead className="text-white ">Index</TableHead>
                  <TableHead className="text-white">Email</TableHead>
                  <TableHead className="text-center text-white">Status</TableHead>
                  <TableHead className="text-center text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{data.length > 0 ? data.map((item: any, index: number) => <DataRow key={index} index={index} rowData={item} />) : <div>No data</div>}</TableBody>
            </Table>
          ) : (
            <p>No data</p>
          )}
        </div>
      ) : (
        <div className="shadow-none h-full flex justify-center items-center bg-slate-50">
          <p>Upload a valid excel file to see the data</p>
        </div>
      )}
    </Card>
  );
}

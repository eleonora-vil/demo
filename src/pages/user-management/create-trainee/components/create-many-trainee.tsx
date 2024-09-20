import ImportExcelTrainee from './import-excel-trainee';
import ImportManualTrainee from './import-manual-trainee';
import DisplayData from './display-data';
import { Send } from 'lucide-react';
import Sendata from './send-data';

export default function CreateManyTrainee() {
  return (
    <div className="w-full grid grid-cols-2 gap-2 h-fit">
      <div className="col-span-1 flex flex-col gap-2 h-full ">
        <div className="flex-1">
          <ImportExcelTrainee />
        </div>
        <div>
          <Sendata />
        </div>
      </div>
      <div className="col-span-1 h-[calc(100vh-180px)] min-h-[700px]">
        <DisplayData />
      </div>
    </div>
  );
}

import DialogLayout from '@/components/dialog-layout';
import ActionIcons from '@/components/icons/action-icons';
import { Button } from '@/components/ui/button';
import AttendeeSelectList from '@/pages/class-detail/components/AttendeeSelectList';
import { DataTable } from '@/pages/class/components/form/data-table.tsx';
const AttendeeList = () => {
  return (
    <div>
      <div>
        <DialogLayout
          button={
            <Button className="bg-primary text-white flex gap-2 mt-3 ml-4">
              <ActionIcons icon="add" />
              Add Student
            </Button>
          }
        >
          <div className="space-y-4 p-6 w-[500px] ">
            <section className="text-xl font-bold flex justify-between items-center">
              <h1>Add Student</h1>
              {/* <DialogClose><XIcon className='ml-auto cursor-pointer' /></DialogClose> */}
            </section>
            <section>
              <AttendeeSelectList />
            </section>
          </div>
        </DialogLayout>
      </div>
      <DataTable />
    </div>
  );
};

export default AttendeeList;

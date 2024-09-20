import DialogLayout from '@/components/dialog-layout';
import ActionIcons from '@/components/icons/action-icons';
import { Button } from '@/components/ui/button';
import { UserCreateForm } from './student-create-form';
export default function CreateUserDialog() {
  return (
    <DialogLayout
      button={
        <Button className="bg-primary text-white flex gap-2">
          <ActionIcons icon="add" />
          Add User
        </Button>
      }
    >
      <div className="space-y-4 p-6">
        <section className="text-xl font-bold flex justify-between items-center">
          <h1>Create User</h1>
          {/* <DialogClose><XIcon className='ml-auto cursor-pointer' /></DialogClose> */}
        </section>
        <section>
          <UserCreateForm />
        </section>
      </div>
    </DialogLayout>
  );
}

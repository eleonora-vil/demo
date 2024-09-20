import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { XIcon } from 'lucide-react';
import { UserCreateForm } from '../form/user-create-form';
import { setIsUpdateFormOpen } from '@/lib/redux/form/userFormSlice';
import { UserUpdateForm } from '../form/user-update-form';

export default function UpdateUserDialog() {
  const isUpdateFormOpen = useAppSelector((state) => state.userForm.isUpdateFormOpen);
  const dispatch = useAppDispatch();
  const handleOpen = (state: boolean) => {
    dispatch(setIsUpdateFormOpen(state));
  };
  return (
    <Dialog open={isUpdateFormOpen} onOpenChange={handleOpen}>
      <DialogContent>
        <div className="space-y-4 p-6">
          <section className="text-xl font-bold flex justify-between items-center">
            <h1>Update User</h1>
            {/* <DialogClose><XIcon className='ml-auto cursor-pointer' /></DialogClose> */}
          </section>
          <section>
            <UserUpdateForm />
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

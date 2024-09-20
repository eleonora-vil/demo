import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import React from 'react';
import { setIsCreateFormOpen } from '@/lib/redux/form/userFormSlice';

type IProps = {
  children: React.ReactNode;
  button: React.ReactNode;
};
export default function DialogLayout({ children, button }: IProps) {
  const [open, setOpen] = React.useState(false);
  const isCreateFormOpen = useAppSelector((state) => state.userForm.isCreateFormOpen);
  const dispatch = useAppDispatch();
  const handleClickOpen = () => {
    dispatch(setIsCreateFormOpen(true));
  };
  return (
    <Dialog
      open={isCreateFormOpen}
      onOpenChange={() => {
        dispatch(setIsCreateFormOpen(false));
      }}
    >
      <span className="cursor-pointer" onClick={handleClickOpen}>
        {button}
      </span>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

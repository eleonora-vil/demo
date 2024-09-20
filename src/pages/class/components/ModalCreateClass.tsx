import ActionIcons from '@/components/icons/action-icons';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export const ModalCreateClass = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="w-[139px] cursor-pointer h-8 px-2.5 py-[7px] bg-gray-700 rounded-lg shadow justify-center items-center gap-[5px] inline-flex">
            <div className="w-6 h-6 relative">
              {' '}
              <ActionIcons icon="add" className="text-white" />
            </div>
            <div className="text-white text-sm font-bold font-['Inter'] leading-normal">Add Syllabus</div>
          </div>
        </DialogTrigger>
        <DialogContent className="rounded-3xl overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-center bg-primary text-white py-3">New Syllabus</DialogTitle>
            <DialogDescription className="p-4">
              <div className="grid-cols-8 grid gap-7 ">
                <div className="col-span-3 font-bold text-black">Syllabus name</div>
                <div className="col-span-5">
                  <Input placeholder=" Syllabus name" className="italic"></Input>
                  <div className="text-red-500 italic">This field is required</div>
                </div>
                <div className="col-span-3 font-bold text-black">Day</div>
                <div className="col-span-5">
                  <div>
                    <Input placeholder=" Day" className="italic"></Input>
                    <div className="text-red-500 italic">This field is required</div>
                  </div>
                </div>
                <div className="col-span-3 font-bold text-black ">Hours</div>
                <div className="col-span-5">
                  <Input placeholder=" Hours" className="italic"></Input>
                  <div className="text-red-500 italic">This field is required</div>
                </div>
              </div>
              <div className="flex justify-center gap-2 text-red p-3">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="submit">Confirm</Button>
                </DialogClose>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

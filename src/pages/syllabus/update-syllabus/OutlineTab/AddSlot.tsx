import { Button } from '@/components/ui/button';
import { BadgePlusIcon } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAppDispatch } from '@/hooks/useRedux';
import { addSlot } from '@/lib/redux/syllabusDetailsSlice';
import { useState } from 'react';
const AddSlot = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    description: 'Description',
    unitName: 'Slot',
  });

  const handleAddSlot = () => {
    dispatch(
      addSlot({
        unitId: 0,
        unitName: formData.unitName,
        description: formData.description,
      }),
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-2 flex gap-2">
          <BadgePlusIcon /> Add slot
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md overflow-hidden">
        <DialogHeader className="p-4 bg-primary text-white">
          <DialogTitle className="text-center">New Slot</DialogTitle>
        </DialogHeader>
        <div className="px-3 grid grid-cols-12 gap-y-4">
          <label htmlFor="slotNameInput" className="col-span-4 font-bold">
            Slot name:
          </label>
          <Input
            type="text"
            id="slotNameInput"
            placeholder="Slot name"
            className="col-span-8"
            value={formData.unitName}
            onChange={(e) => setFormData({ ...formData, unitName: e.target.value })}
          />
          <label htmlFor="descriptionInput" className="col-span-4 font-bold">
            Description:
          </label>
          <Input
            type="text"
            id="descriptionInput"
            placeholder="Description"
            className="col-span-8 p-1 "
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div className="flex justify-center p-3">
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="text-red-500">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" onClick={handleAddSlot}>
                Add slot
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSlot;

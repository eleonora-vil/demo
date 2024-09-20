import DocumentManageIcons from '@/components/icons/document-manage-icons';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { updateSlotByIndex } from '@/lib/redux/syllabusDetailsSlice';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
const EditSlot = ({ index }: { index: number }) => {
  const currentSlot = useAppSelector((state) => state.syllabusDetails.createTrainingProgramUnits[index]);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    description: '',
    unitName: '',
  });

  useEffect(() => {
    setFormData({
      description: currentSlot?.trainingProgramUnitModel.description,
      unitName: currentSlot?.trainingProgramUnitModel.unitName,
    });
  }, [index]);

  const handleSaveSlot = () => {
    toast.info('Slot is saved');

    dispatch(
      updateSlotByIndex({
        index,
        unitName: formData.unitName,
        description: formData.description,
      }),
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <DocumentManageIcons icon="create" />
          Edit Slot
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md overflow-hidden">
        <DialogHeader className="p-4 bg-primary text-white">
          <DialogTitle className="text-center">Edit Slot</DialogTitle>
        </DialogHeader>
        <div className="px-5 grid grid-cols-12 gap-y-4">
          <label htmlFor="slotNameInput" className="col-span-4 font-bold">
            Slot name:
          </label>
          <Input
            type="text"
            id="slotNameInput"
            placeholder="Slot name"
            className="col-span-8"
            defaultValue={formData.unitName}
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
            defaultValue={formData.description}
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
              <Button type="button" onClick={handleSaveSlot}>
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditSlot;

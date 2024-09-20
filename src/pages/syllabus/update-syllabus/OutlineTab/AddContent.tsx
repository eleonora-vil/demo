/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BadgePlusIcon } from 'lucide-react';

import SwitchButton from '@/components/switch-button/SwitchButton';
import { Input } from '@/components/ui/input';
import { useAppDispatch } from '@/hooks/useRedux';
import { getOutputStandards } from '@/lib/api/output-standard-api';
import { addLearningObjects } from '@/lib/redux/syllabusDetailsSlice';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DialogCreateAddOutput from './DialogCreateAddOutput';

const AddContent = ({ unitIndex }: { unitIndex: number }) => {
  const [formData, setFormData] = useState({
    name: '',
    trainingTime: '',
    method: false,
    status: '',
    deliveryType: 'lab',
    duration: '',
    outputStandardId: 1,
  });
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const [outputStandards, setOutputStandards] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [assessmentOutput, setAssessmentOutput] = useState<any[]>([]);
  const [selectId, setSelectId] = useState(1);
  const [rerender, setRerender] = useState<boolean>(true);
  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    getOutputStandards()
      .then((res) => {
        // console.log(res.data?.result?.outputStandardModels);
        setOutputStandards(res.data?.result?.outputStandardModels || []);
        // {
        //   outputStandardId: 1,
        //   tags: 'LV1',
        //   description: 'Understand fundamental programming concepts'
        // },
      })
      .catch((err) => {
        console.log(err);
      });
  }, [rerender]);

  const handleRefresh = () => {
    setRerender(!rerender);
  };

  const handleAddContent = () => {
    // validation is null
    if (formData.name === '' || formData.duration === '') {
      toast.error('Please fill all the fields');
      return;
    }

    dispatch(
      addLearningObjects({
        unitIndex: unitIndex,
        learningObjModel: {
          learningObjId: 0,
          name: formData.name,
          trainingTime: formData.trainingTime,
          method: formData.method,
          status: formData.status,
          deliveryType: formData.deliveryType,
          duration: formData.duration,
          outputStandardId: formData.outputStandardId,
        },
      }),
    );
    toast.info('Content is added');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2 bg-slate-200 text-black hover:bg-slate-300">
          <BadgePlusIcon /> Add Content
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md overflow-hidden">
        <DialogHeader className="p-4 bg-primary text-white">
          <DialogTitle className="text-center">New Content</DialogTitle>
        </DialogHeader>
        <div className="px-3 grid grid-cols-12 gap-y-4">
          <label htmlFor="unitNameInput" className="col-span-4 font-bold flex items-center">
            Unit name:
          </label>
          <Input
            type="text"
            id="unitNameInput"
            placeholder="Unit name"
            className="col-span-8"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <label htmlFor="outputStandardInput" className="col-span-4 font-bold flex items-center">
            Output Standard:
          </label>
          <Select onValueChange={(value) => setFormData({ ...formData, outputStandardId: +value })} defaultValue={formData.outputStandardId.toString()}>
            <SelectTrigger className="col-span-8 p-1 " id="outputStandardInput">
              <SelectValue placeholder="Output Standard" />
            </SelectTrigger>
            <SelectContent>
              {outputStandards.map((outputStandard: any) => (
                <SelectItem value={outputStandard?.outputStandardId.toString()} key={outputStandard?.outputStandardId}>
                  {outputStandard?.tags} - {outputStandard?.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="col-span-full col-start-5">
            {' '}
            <DialogCreateAddOutput handleToggleOpen={handleToggleOpen} isOpen={isOpen} handleRefresh={handleRefresh} setSelectId={setSelectId} />
          </div>
          <label htmlFor="trainingTimeInput" className="col-span-4 font-bold flex items-center">
            Duration:
          </label>
          <Input
            type="number"
            id="trainingTimeInput"
            placeholder="30mins"
            className="col-span-8"
            value={formData.duration}
            min={0}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          />
          <label htmlFor="deliveryType" className="col-span-4 font-bold flex items-center">
            Delivery type:
          </label>
          <Select onValueChange={(value) => setFormData({ ...formData, deliveryType: value })} defaultValue={formData.deliveryType}>
            <SelectTrigger className="col-span-8 p-1 " id="deliveryType">
              <SelectValue placeholder="Output Standard" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lab">Asignment/Lab</SelectItem>
              <SelectItem value="lecture">Concept/Lecture</SelectItem>
              <SelectItem value="review">Guide/Review</SelectItem>
              <SelectItem value="quiz">Test/Quiz</SelectItem>
              <SelectItem value="exam">Exam</SelectItem>
              <SelectItem value="workshop">Senimar/Workshop</SelectItem>
            </SelectContent>
          </Select>
          <label htmlFor="deliveryType" className="col-span-4 font-bold flex items-center">
            Method:
          </label>
          <div>
            <SwitchButton
              value={formData.method}
              onToggle={() =>
                setFormData({
                  ...formData,
                  method: !formData.method,
                })
              }
            />
          </div>
        </div>
        <div className="flex justify-center p-3">
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="text-red-500">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleAddContent}>
              Add content
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddContent;

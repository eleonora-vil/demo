import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAssessmentSchemes } from '@/lib/api/syllabus-detail-api';
import { PlusIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import DialogAddScheme from './DialogAddScheme';
type CreateAssessmentProps = {
  handleAddAssessment: any;
};
const CreateAssessment = ({ handleAddAssessment }: CreateAssessmentProps) => {
  const valueRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [selectId, setSelectId] = useState<any>(1);
  const [rerender, setRerender] = useState<boolean>(true);

  const [assessmentSchemes, setAssessmentSchemes] = useState<any[]>([]);
  console.log(selectId)

  useEffect(() => {
    getAssessmentSchemes().then((res) => {
      console.log(res.data?.result?.assessmentSchemes);
      setAssessmentSchemes(res.data?.result?.assessmentSchemes);
    });
  }, [rerender]);
  const handleRefresh = () => {
    setRerender(!rerender);
  }

  const handleAddButton = () => {
    console.log(selectId);

    // get assessment based on selectId
    console.log(valueRef.current?.value);
    
    handleAddAssessment(
      selectId.toString(),
      assessmentSchemes.find((item) => {
        return item.assessmentSchemeId === selectId;
      })?.assessmentSchemeName,
      valueRef.current?.value,
    );
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-primary text-white p-1 rounded">
        <PlusIcon className="w-[20px] h-[20px]" />
      </DialogTrigger>
      <DialogContent className="overflow-hidden">
        <DialogHeader className="p-4 bg-primary text-white">
          <DialogTitle className="font-bold text-center">Add new assessment</DialogTitle>
        </DialogHeader>
        <div className="px-2">
          <div className="flex flex-col gap-2">
            <label className="font-bold col-span-4" htmlFor="assessmentNameInput">
              Assessment name:
            </label>
              {
                selectId && (
                  <Select onValueChange={(value) => setSelectId(parseInt(value))} defaultValue={selectId.toString()}>
                    <SelectTrigger className="" id="1">
                      <SelectValue placeholder="Assessment Scheme" />
                    </SelectTrigger>
                    <SelectContent>
                      {assessmentSchemes.map((item, index) => {
                        return (
                          <SelectItem key={index} value={item.assessmentSchemeId.toString()}>
                            {item.assessmentSchemeName}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                )
              }
              <DialogAddScheme handleToggleOpen={handleToggleOpen} isOpen={isOpen} handleRefresh={handleRefresh} setSelectId={setSelectId}/>
            <label className="font-bold col-span-4" htmlFor="percentMarkInput">
              Percent mark:
            </label>
            <Input type="text" className="col-span-7" id="percentMarkInput" ref={valueRef}   placeholder="Percent mark" />
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-2 pb-3">
          <DialogClose asChild>
            <Button variant="outline" className="text-red-500">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" onClick={() => handleAddButton()}>
              Add
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssessment;

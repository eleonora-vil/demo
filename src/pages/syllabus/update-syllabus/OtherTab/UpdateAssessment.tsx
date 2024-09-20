import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAssessmentSchemes } from '@/lib/api/syllabus-detail-api';
import { PencilLineIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AssessmentType } from './OtherTab';

type UpdateAssessmentProps = {
  assessment: AssessmentType | undefined;
  handleUpdateAssessment: (assessmentSchemeId: string, assessmentSchemeName: string, percentMark: string | undefined) => void;
};
const UpdateAssessment = ({ assessment, handleUpdateAssessment }: UpdateAssessmentProps) => {
  console.log(assessment);
  
  if (!assessment) {
    return null;
  }
  const [selectId, setSelectId] = useState<any>(1);
  const [assessmentSchemes, setAssessmentSchemes] = useState<any[]>([]);
  const [rerender, setRerender] = useState<boolean>(true);
  const valueRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    getAssessmentSchemes().then((res) => {
      console.log(res.data?.result?.assessmentSchemes);
      setAssessmentSchemes(res.data?.result?.assessmentSchemes);
    });
  }, [rerender]);
  const handleRefresh = () => {
    setRerender(!rerender);
  };

  console.log(selectId)

  useEffect(() => {
    setSelectId(assessment.assessmentSchemeId);
  }, [assessment]);
  const handleUpdate = () => {
    console.log(selectId);

    // get assessment based on selectId

    handleUpdateAssessment(
      selectId.toString(),
      assessmentSchemes.find((item) => {
        return item.assessmentSchemeId === parseInt(selectId);
      })?.assessmentSchemeName,
      valueRef.current?.value,
    );
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-primary text-white p-1 rounded">
        <PencilLineIcon className="w-[20px] h-[20px]" />
      </DialogTrigger>
      <DialogContent className="overflow-hidden">
        <DialogHeader className="bg-primary">
          <DialogTitle className="font-bold text-center p-4 text-white ">Edit assessment</DialogTitle>
        </DialogHeader>
        <div className="px-2">
          <div className="grid grid-cols-12 gap-2">
            <Select onValueChange={(value) => setSelectId(value)} defaultValue={selectId.toString()}>
              
                <SelectTrigger className="col-span-3 p-1 " id="1">
                  <SelectValue placeholder="Assessment Scheme" />
                </SelectTrigger>
                {/* <DialogAddScheme handleToggleOpen={handleToggleOpen} isOpen={isOpen} handleRefresh={handleRefresh} setSelectId={setSelectId}/> */}
              
              <SelectContent>
                {/* add scheme button */}
                {assessmentSchemes.map((item, index) => {
                  console.log(item.assessmentSchemeId)
                  return (
                    <SelectItem key={index} value={item.assessmentSchemeId.toString()}>
                      {item.assessmentSchemeName}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <Input type="text" className="col-span-7" ref={valueRef} defaultValue={assessment?.percentMark} />
            <span className="font-bold col-span-1 flex items-center">%</span>
          </div>
        </div>
        <div className="flex justify-center mt-3 pb-3 gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="text-red-500">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={() => {
                handleUpdate();
              }}
            >
              Save
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAssessment;

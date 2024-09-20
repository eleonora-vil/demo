import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createAssessmentScheme } from '@/lib/api/syllabus-detail-api';
import { Plus, XIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function DialogAddScheme({
  handleToggleOpen,
  isOpen,
  handleRefresh,
  setSelectId,
}: {
  handleToggleOpen: () => void;
  isOpen: boolean;
  handleRefresh: () => void;
  setSelectId: any;
}) {
  const [assessmentSchemeName, setAssessmentSchemeName] = useState<string>('');

  const handleCreate = () => {
    // create new assessment scheme

    createAssessmentScheme({
      assessmentSchemeName: assessmentSchemeName,
      percentMark: 0,
    })
      .then((res) => {
        console.log(res);
        if (res.error) {
          toast.error(res.error.result?.message);
          return;
        }
        toast.success('Create assessment scheme successfully');
        handleToggleOpen();
        handleRefresh();
        console.log(res.data?.result?.assessmentSchemeModel?.assessmentSchemeId)
        setSelectId(res.data?.result?.assessmentSchemeModel?.assessmentSchemeId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {!isOpen && (
        <Button size="icon" className="bg-primary text-white p-1 rounded" onClick={handleToggleOpen}>
          <Plus className="w-[20px] h-[20px]" />
        </Button>
      )}
      {isOpen && (
        <div className="flex gap-2">
          <Input type="text" placeholder="Assessment scheme name" value={assessmentSchemeName} onChange={(e) => setAssessmentSchemeName(e.target.value)} />
          <Button type="button" onClick={handleToggleOpen} size="icon" variant="destructive" className="p-2">
            <XIcon />
          </Button>
          <Button type="button" onClick={handleCreate}>
            Save
          </Button>
        </div>
      )}
    </div>
  );
}

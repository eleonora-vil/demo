import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createOutputStandard } from '@/lib/api/output-standard-api';
import { Plus, XIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

import React from 'react';

export default function DialogCreateAddOutput({
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
  const [tags, setTags] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleCreate = () => {
    // create new assessment scheme

    createOutputStandard({
      tags: tags,
      description: description,
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
        console.log(res.data?.result?.assessmentSchemeModel?.assessmentSchemeId);
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
        <div className="flex gap-2 flex-col">
          <div className="flex gap-2 ">
            <Input type="text" placeholder="tags" className="w-[4vw] " value={tags} onChange={(e) => setTags(e.target.value)}></Input>
            <Input type="text" placeholder="descripttion" className="" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="flex gap-2 justify-center">
            {' '}
            <Button type="button" onClick={handleToggleOpen} variant="destructive" className="w-[5vw]">
              Cancle
            </Button>
            <Button type="button" onClick={handleCreate} className="w-[5vw]">
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

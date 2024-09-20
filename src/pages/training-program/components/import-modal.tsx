import DocumentManageIcons from '@/components/icons/document-manage-icons';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppDispatch } from '@/hooks/useRedux';
import { importCSV } from '@/lib/api/training-program-api';
import { updateReRenderFunction } from '@/lib/redux/dataTableSlice';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  isAccessable?: boolean;
}

const methodOptions = [
  { value: 'allow', label: 'Allow' },
  { value: 'replace', label: 'Replace' },
  { value: 'skip', label: 'Skip' },
];

const fileTypes = ['text/csv'];

export function ImportModal({ isAccessable }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [isDataValid, setIsDataValid] = useState<boolean>(false);
  const [method, setMethod] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    setIsOpened(true);
  };

  const handleClose = () => {
    setIsOpened(false);
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && fileTypes.includes(file.type)) {
      setFile(file);
    } else {
      toast.info('Invalid file type', {
        position: 'top-center',
      });
    }
  };

  const handleMethodChange = (value: string) => {
    setMethod(value);
  };

  useEffect(() => {
    if (file && method) {
      setIsDataValid(true);
    } else {
      setIsDataValid(false);
    }
  }, [file, method]);

  const handleSubmit = async () => {
    if (file && method) {
      setIsLoading(true);
      await importCSV(file, method)
        .then((res) => {
          console.log(res);
          
          if (res.error != null) {
            toast.error(res.error.result.message, {
              position: 'top-center',
            });
          } else {
            toast.success(res.data.result.message, {
              position: 'top-center',
            });
          }
        })
        .finally(() => {
          setIsLoading(false);
          setIsOpened(false);
          dispatch(updateReRenderFunction());
        });
    }
  };

  const handleCancle = () => {
    setIsOpened(false);
    setFile(null);
    setMethod('');
  };

  return (
    <div className={`${isAccessable ? '' : 'hidden'}`}>
      <AlertDialog open={isOpened}>
        <AlertDialogTrigger>
          <Button className="flex items-center gap-2" onClick={handleOpen}>
            <DocumentManageIcons icon="upload" />
            Import
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Import Training Program</AlertDialogTitle>
            <AlertDialogDescription>Import a valid excel file to create multiple training programs at once</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4">
            <Input type="file" onChange={handleChangeFile} />
            <Select onValueChange={(value) => handleMethodChange(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                {methodOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancle}>Cancel</AlertDialogCancel>
            <Button disabled={!isDataValid} onClick={handleSubmit}>
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

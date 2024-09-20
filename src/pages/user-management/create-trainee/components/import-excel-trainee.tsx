import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import React, { useEffect, useState } from 'react';
import * as xlsx from 'xlsx';
import { setData, setIsDataValid, setInvalidCount, setExistedCount, setIsLoading, setSuccessCount } from '@/lib/redux/createTraineeSlice';
import { FileDown } from 'lucide-react';
import ImportManualTrainee from './import-manual-trainee';
import { useDropzone } from 'react-dropzone';
import ExportButton from './export-example-excel';
import { toast } from 'react-toastify';
import { createTraineeFirstStep, firstStepData, firstStepResponse } from '@/lib/api/create-trainee/first-step';
import { frontEndLink } from '@/lib/api/config/link';

export default function ImportExcelTrainee() {
  const [typeError, setTypeError] = useState<string | null>(null);
  const inputFileRef = React.createRef<HTMLInputElement>();
  const [file, setFile] = useState<File | null>(null);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const { data, isDataValid, invalidCount, existedCount, successCount } = useAppSelector((state) => state.createTrainee);
  const dispatch = useAppDispatch();

  const handleFile = (file: File) => {
    const fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    if (file && fileTypes.includes(file.type)) {
      setFile(file);
      setTypeError(null);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = xlsx.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        const emails = json.map((item: any) => item.Email);
        console.log(emails);
        dispatch(setData({ data: emails }));
      };
      reader.readAsArrayBuffer(file);
    } else {
      setTypeError('Invalid file type');
      setFile(null);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      handleFile(file);
    },
  });

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] as File;
    handleFile(selectedFile);
  };
  const handleClear = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
    dispatch(setData({ data: [] }));
    dispatch(setIsDataValid({ isDataValid: false }));
    dispatch(setInvalidCount({ invalidCount: 0 }));
    dispatch(setExistedCount({ existedCount: 0 }));
    setTypeError(null);
    setFile(null);
  };

  const handleFirstStep = async (firstStepData: firstStepData) => {
    const response: firstStepResponse = (await createTraineeFirstStep(firstStepData)) as firstStepResponse;
    if (response && response?.success) {
      dispatch(setSuccessCount({ successCount: successCount + 1 }));
    }
  };

  const handleSubmit = async () => {
    if (isDataValid && data.length > 0 && !typeError && invalidCount === 0 && existedCount === 0) {
      const link = `${frontEndLink}/verify?email=`;
      dispatch(setIsLoading({ isLoading: true }));

      const promises = data.map(async (email) => {
        const firstStepData: firstStepData = {
          email: email,
          link: link,
        };
        await handleFirstStep(firstStepData);
      });

      // Wait for all promises to resolve
      await Promise.all(promises);

      // This block will execute after all handleFirstStep calls are completed
      dispatch(setIsLoading({ isLoading: false }));
      setFile(null);
      dispatch(setData({ data: [] }));
      dispatch(setIsDataValid({ isDataValid: false }));
      dispatch(setInvalidCount({ invalidCount: 0 }));
      dispatch(setExistedCount({ existedCount: 0 }));
      toast.success('Create trainee success', {
        position: 'top-left',
      });
    }
  };

  const handleDisabledButton = () => {
    if (data.length === 0) {
      setDisabledButton(true);
    } else {
      if (isDataValid) {
        setDisabledButton(false);
      } else {
        setDisabledButton(true);
      }
    }
  };

  useEffect(() => {
    handleDisabledButton();
  }, [data, isDataValid]);

  return (
    <Card className=" bg-slate-50 border-slate-500 h-full flex flex-col">
      <CardHeader className="flex flex-row items-end justify-between ">
        <div className=" flex-1">
          <CardTitle>Import Trainees Excel</CardTitle>
          <CardDescription>Import a valid excel file to create multiple trainees at once</CardDescription>
        </div>
        <div>
          <ExportButton />
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-2">
        <div className="flex-1 bg-slate-200 border-dashed rounded-md border-2 border-slate-500 border-separate">
          <Label className={`flex text-slate-500 items-center justify-center gap-2 cursor-pointer h-full w-full ${typeError && 'text-red-500'}`} {...getRootProps()}>
            <FileDown size={24} />
            {typeError ? <div>{typeError}</div> : file ? file.name : 'Drag and drop or click to select file'}
          </Label>
        </div>
        <div>
          <ImportManualTrainee />
        </div>
        <Input type="file" onChange={handleChangeFile} ref={inputFileRef} className=" hidden" {...getInputProps()} />
      </CardContent>
      <CardFooter className=" flex items-center gap-4">
        <Button type="button" onClick={handleClear} className="bg-white text-primary border-[1px] border-input hover:bg-slate-100 ">
          Clear
        </Button>
        <Button type="button" onClick={handleSubmit} className="bg-primary text-white hover:bg-primary-600" disabled={disabledButton}>
          Send Email to all
        </Button>
      </CardFooter>
    </Card>
  );
}

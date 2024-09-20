import { Button } from '@/components/ui/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ButtonCompose = ({ submitForm }: any) => {
  const navigator = useNavigate();
  return (
    <div className="flex flex-row justify-between gap-2">
        <Button variant="outline" className='text-red-500' onClick={() => navigator('/training-program')}>
          Cancel
        </Button>
        <Button onClick={() => submitForm()}>Update</Button>
    </div>
  );
};

export default ButtonCompose;

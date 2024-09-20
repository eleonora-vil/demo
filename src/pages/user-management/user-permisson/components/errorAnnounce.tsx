import ActionIcons from '@/components/icons/action-icons';
import { getData } from '@/lib/api/permissionTable';
import React, { useState } from 'react';

const ErrorAnnounce = () => {
  const [errorMessage, setErrorMessage] = useState();
  const getError = async () => {
    setErrorMessage((await getData()).error);
  };
  getError();
  return (
    <div className=" h-60 flex flex-row bg-white justify-center items-center" style={{ width: '1185.4px', gap: '10px', color: 'red' }}>
      <ActionIcons icon="cancel" />
      {errorMessage}
    </div>
  );
};

export default ErrorAnnounce;

import TitleBanner from '@/components/title-banner';
import React, { useEffect, useState } from 'react';
import { PermissionTable } from './components/permissionTable';
import { Button } from '@/components/ui/button';
import { UpdatePermissionTable } from './components/updatePermissionTable';
import { getData } from '@/lib/api/permissionTable';
import ErrorAnnounce from './components/errorAnnounce';
import DocumentManageIcons from '@/components/icons/document-manage-icons';

const UserPermission = () => {
  const [isError, setIsError] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const onClickFunc = (): any => {
    setIsClicked(!isClicked);
  };

  const checkData = async () => {
    if ((await getData()).error) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };
  useEffect(() => {
    checkData();
  });
  useEffect(() => {
    document.title = "User Permission - FAMS"
  }, [])
  return (
    <main className="space-y-2 pb-12">
      <div className="flex flex-row justify-between items-end">
        <TitleBanner
          title={'User Permission'}
          component={[
            <div className="flex">
              {isError != true && isClicked == false && (
                <Button className="bg-primary text-white flex gap-2" onClick={() => onClickFunc()}>
                  <DocumentManageIcons icon="create" /> UPDATE
                </Button>
              )}
            </div>,
          ]}
        />
      </div>
      {isError != true ? isClicked == false ? <PermissionTable value={isClicked} /> : <UpdatePermissionTable method={setIsClicked} value={isClicked} /> : <ErrorAnnounce />}
    </main>
  );
};

export default UserPermission;

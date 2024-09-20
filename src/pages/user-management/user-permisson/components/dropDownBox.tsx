import ActionIcons from '@/components/icons/action-icons';
import DocumentManageIcons from '@/components/icons/document-manage-icons';
import IndicatorIcons from '@/components/icons/indicator-icons';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useEffect, useState } from 'react';

const DropDownBox = (props: any) => {
  // const permissionSchema=[{
  //   "permissionId": 1,
  //   "syllabusAccess": "string",
  //   "programAccess": "string",
  //   "userAccess": "string",
  //   "classAccess": "string",
  //   "materialAccess": "string",
  //   "roleID": 1,
  //   "role":""
  // },
  // {
  //   "permissionId": 2,
  //   "syllabusAccess": "string",
  //   "programAccess": "string",
  //   "userAccess": "string",
  //   "classAccess": "string",
  //   "materialAccess": "string",
  //   "roleID": 2,
  //   "role":""
  // },
  // {
  //   "permissionId": 3,
  //   "syllabusAccess": "string",
  //   "programAccess": "string",
  //   "userAccess": "string",
  //   "classAccess": "string",
  //   "materialAccess": "string",
  //   "roleID": 3,
  //   "role":""
  // },
  // {
  //   "permissionId": 4,
  //   "syllabusAccess": "string",
  //   "programAccess": "string",
  //   "userAccess": "string",
  //   "classAccess": "string",
  //   "materialAccess": "string",
  //   "roleID": 4,
  //   "role":""
  // }]

  // if(props.value.length==0) return;

  const permissionSchema = props.value;

  const [selected, setSelected] = useState('None');

  const [defaultData, setDefaultData] = useState(permissionSchema[props.cellID.split('_')[0]][props.cellID.split('_')[1]]);

  const onChangeFunc = (e: any): any => {
    console.log(props.cellID.split('_')[1]);
    console.log(props.rowID);
    const field = props.cellID.split('_')[1];

    const rowID = props.rowID;
    console.log(e);

    if (field == 'syllabusAccess') {
      permissionSchema[rowID].syllabusAccess = e;
    } else if (field == 'programAccess') {
      permissionSchema[rowID].programAccess = e;
      console.log(permissionSchema);
    } else if (field == 'classAccess') {
      permissionSchema[rowID].classAccess = e;
    } else if (field == 'materialAccess') {
      permissionSchema[rowID].materialAccess = e;
    } else if (field == 'userAccess') {
      permissionSchema[rowID].userAccess = e;
    }

    props.method(permissionSchema);
    setSelected(e);
  };

  return (
    <>
      <div className="w-full">
        <Select onValueChange={(value) => onChangeFunc(value)} defaultValue={defaultData}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select permission" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Permission</SelectLabel>
              <SelectItem value="Access denied">
                <div className="flex items-center gap-2">
                  <ActionIcons icon="visibility-off" /> <span>Access denied</span>
                </div>
              </SelectItem>
              <SelectItem value="View">
                <div className="flex items-center gap-2">
                  <ActionIcons icon="visibility" /> <span>View</span>
                </div>
              </SelectItem>
              <SelectItem value="Modify">
                <div className="flex items-center gap-2">
                  <DocumentManageIcons icon="create" />
                  <span>Modify</span>
                </div>
              </SelectItem>
              <SelectItem value="Create">
                <div className="flex items-center gap-2">
                  <ActionIcons icon="add" /> <span>Create</span>
                </div>
              </SelectItem>
              <SelectItem value="Full access">
                <div className="flex items-center gap-2">
                  <IndicatorIcons icon="grade" /> <span>Full Access</span>
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default DropDownBox;

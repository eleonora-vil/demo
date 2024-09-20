import { ColumnDef } from '@tanstack/react-table';
import SortIconStatus from '../../components/sort-icon-status';
import IndicatorIcons from '@/components/icons/indicator-icons';
import ActionIcons from '@/components/icons/action-icons';
import DocumentManageIcons from '@/components/icons/document-manage-icons';

type Role = {
  permissionId: number;
  syllabusAccess: string;
  programAccess: string;
  userAccess: string;
  classAccess: string;
  materialAccess: string;
  roleID: number;
  role: string;
};
export const columns: ColumnDef<Role>[] = [
  {
    accessorKey: 'roleID',
    header: 'Role Name',
    cell: ({ row }) => <div>{row.getValue('roleID') == 1 ? 'SuperAdmin' : row.getValue('roleID') == 2 ? 'Admin' : row.getValue('roleID') == 3 ? 'Instructor' : 'Trainee'}</div>,
  },
  {
    accessorKey: 'syllabusAccess',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Syllabus
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="font-bold">
        {row.getValue('syllabusAccess') == 'Full access' ? (
          <div className="flex items-center gap-2">
            <IndicatorIcons icon="grade" /> <span>Full Access</span>
          </div>
        ) : row.getValue('syllabusAccess') == 'Create' ? (
          <div className="flex items-center gap-2">
            <ActionIcons icon="add" /> <span>Create</span>
          </div>
        ) : row.getValue('syllabusAccess') == 'Modify' ? (
          <div className="flex items-center gap-2">
            <DocumentManageIcons icon="create" />
            <span>Modify</span>
          </div>
        ) : row.getValue('syllabusAccess') == 'Access denied' ? (
          <div className="flex items-center gap-2">
            <ActionIcons icon="visibility-off" /> <span>Access denied</span>
          </div>
        ) : row.getValue('syllabusAccess') == 'View' ? (
          <div className="flex items-center gap-2">
            <ActionIcons icon="visibility" /> <span>View</span>
          </div>
        ) : (
          row.getValue('syllabusAccess')
        )}
      </div>
    ),
  },
  {
    accessorKey: 'programAccess',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Training Program
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">
        {row.getValue('programAccess') == 'Full access' ? (
          <div className="flex items-center gap-2">
            <IndicatorIcons icon="grade" /> <span>Full Access</span>
          </div>
        ) : row.getValue('programAccess') == 'Create' ? (
          <div className="flex items-center gap-2">
            <ActionIcons icon="add" /> <span>Create</span>
          </div>
        ) : row.getValue('programAccess') == 'Modify' ? (
          <div className="flex items-center gap-2">
            <DocumentManageIcons icon="create" />
            <span>Modify</span>
          </div>
        ) : row.getValue('programAccess') == 'Access denied' ? (
          <div className="flex items-center gap-2">
            <ActionIcons icon="visibility-off" /> <span>Access denied</span>
          </div>
        ) : row.getValue('programAccess') == 'View' ? (
          <div className="flex items-center gap-2">
            <ActionIcons icon="visibility" /> <span>View</span>
          </div>
        ) : (
          row.getValue('programAccess')
        )}
      </div>
    ),
  },
  {
    accessorKey: 'classAccess',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Class
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => (
      <div>
        {row.getValue('classAccess') == 'Full access' ? (
          <div className="flex items-center gap-2">
            <IndicatorIcons icon="grade" /> <span>Full Access</span>
          </div>
        ) : row.getValue('classAccess') == 'Create' ? (
          <div className="flex items-center gap-2">
            <ActionIcons icon="add" /> <span>Create</span>
          </div>
        ) : row.getValue('classAccess') == 'Modify' ? (
          <div className="flex items-center gap-2">
            <DocumentManageIcons icon="create" />
            <span>Modify</span>
          </div>
        ) : row.getValue('classAccess') == 'Access denied' ? (
          <div className="flex items-center gap-2">
            <ActionIcons icon="visibility-off" /> <span>Access denied</span>
          </div>
        ) : row.getValue('classAccess') == 'View' ? (
          <div className="flex items-center gap-2">
            <ActionIcons icon="visibility" /> <span>View</span>
          </div>
        ) : (
          row.getValue('classAccess')
        )}
      </div>
    ),
  },
  {
    accessorKey: 'materialAccess',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Learning Material
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => (
      <div>
        {row.getValue('materialAccess') == 'Full access' ? (
          <div className="flex items-center gap-2">
            <IndicatorIcons icon="grade" /> <span>Full Access</span>
          </div>
        ) : row.getValue('materialAccess') == 'Create' ? (
          <div className="flex items-center gap-2">
            <ActionIcons icon="add" /> <span>Create</span>
          </div>
        ) : row.getValue('materialAccess') == 'Modify' ? (
          <div className="flex items-center gap-2">
            <DocumentManageIcons icon="create" />
            <span>Modify</span>
          </div>
        ) : row.getValue('materialAccess') == 'Access denied' ? (
          <div className="flex items-center gap-2">
            <ActionIcons icon="visibility-off" /> <span>Access denied</span>
          </div>
        ) : row.getValue('materialAccess') == 'View' ? (
          <div className="flex items-center gap-2">
            <ActionIcons icon="visibility" /> <span>View</span>
          </div>
        ) : (
          row.getValue('materialAccess')
        )}
      </div>
    ),
  },
  {
    accessorKey: 'userAccess',
    header: ({ column }) => {
      return (
        <div className="flex items-center cursor-pointer gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          User
          <SortIconStatus columnIsSorted={column.getIsSorted()} />
        </div>
      );
    },
    cell: ({ row }) => (
      <div>
        {row.getValue('userAccess') == 'Full access' ? (
          <div className="flex items-center gap-2">
            <IndicatorIcons icon="grade" /> <span>Full Access</span>
          </div>
        ) : row.getValue('userAccess') == 'Create' ? (
          <div className="flex items-center gap-2">
            <ActionIcons icon="add" /> <span>Create</span>
          </div>
        ) : row.getValue('userAccess') == 'Modify' ? (
          <div className="flex items-center gap-2">
            <DocumentManageIcons icon="create" />
            <span>Modify</span>
          </div>
        ) : row.getValue('userAccess') == 'Access denied' ? (
          <div className="flex items-center gap-2">
            <ActionIcons icon="visibility-off" /> <span>Access denied</span>
          </div>
        ) : row.getValue('userAccess') == 'View' ? (
          <div className="flex items-center gap-2">
            <ActionIcons icon="visibility" /> <span>View</span>
          </div>
        ) : (
          row.getValue('userAccess')
        )}
      </div>
    ),
  },
];

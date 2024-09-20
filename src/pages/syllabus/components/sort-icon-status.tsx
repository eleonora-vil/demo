import ActionIcons from '@/components/icons/action-icons';
import React from 'react';

export default function SortIconStatus({ columnIsSorted }: { columnIsSorted: false | 'asc' | 'desc' }) {
  return (
    <div>
      {columnIsSorted != false && (
        <React.Fragment>{columnIsSorted == 'asc' ? <ActionIcons icon="sort" className="transform rotate-180" /> : <ActionIcons icon="sort" />}</React.Fragment>
      )}
    </div>
  );
}

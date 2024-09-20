import { useState } from 'react';
import DocumentManageIcons from '../icons/document-manage-icons';
import SearchBox from '../search-box';
import { Badge } from '../ui/badge';
import PopupFilter from './popup-filter';
import ActionIcons from '../icons/action-icons';

export default function FilterSearchBox() {
  const [filter, setFilter] = useState(['foundation', 'Hadt17']);

  const handleDelete = (item: string) => {
    setFilter(filter.filter((i) => i !== item));
  };
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <SearchBox icon={<DocumentManageIcons icon="search" />} />
        <PopupFilter />
      </div>
      <div className="flex gap-2">
        {filter.map((item, index) => (
          <Badge key={index} className="flex gap-2">
            {item} <ActionIcons className="cursor-pointer" icon="cancel" onClick={() => handleDelete(item)} />
          </Badge>
        ))}
      </div>
    </div>
  );
}

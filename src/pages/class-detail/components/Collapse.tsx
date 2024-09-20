import ActionIcons from '@/components/icons/action-icons';
import React, { ReactElement, ReactNode, useState } from 'react';

type CollapseProps = {
  children: ReactElement | ReactElement[];
  title: string;
  icon: ReactNode;
  description?: string | ReactElement;
};
const Collapse = ({ children, title, icon, description, ...props }: CollapseProps & React.HTMLAttributes<HTMLDivElement>) => {
  const [isCollapse, setIsCollapse] = useState(false);
  const handleToggleCollapseClick = () => {
    setIsCollapse(!isCollapse);
  };
  return (
    <div {...props}>
      <div className="flex justify-between bg-primary text-white py-2 px-5 rounded-xl gap-3 shadow-lg">
        <div className="flex gap-3">
          {icon} <h3 className="font-bold">{title}</h3>
          {description && <p>{description}</p>}
        </div>
        <button onClick={handleToggleCollapseClick}>
          <ActionIcons icon="arrow-dropdown-circle" />
        </button>
      </div>
      {!isCollapse && <div className="shadow-lg rounded-lg">{children}</div>}
    </div>
  );
};

export default Collapse;

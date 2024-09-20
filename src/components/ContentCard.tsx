import { ReactNode } from 'react';

type ContentCardProps = {
  children: ReactNode;
  icon: ReactNode;
  title: string;
};
const ContentCard = ({ children, icon, title, ...props }: ContentCardProps & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      <div className="rounded-lg shadow-[0_0_2px_2px_rgba(0,0,0,0.2)]">
        <div className="bg-primary flex gap-2 text-white p-3 rounded-t-lg">
          {icon} {title}
        </div>
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
};

export default ContentCard;

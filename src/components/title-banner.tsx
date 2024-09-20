import React from 'react';
import Typography from './Typography';

export default function TitleBanner({ title, component }: { title: string; component?: React.ReactNode[] }) {
  return (
    <div className="p-6 pb-0 text-h4 flex justify-between items-center gap-4 w-full flex-1">
      <Typography type="h2" className="font-bold">
        {title}
      </Typography>
      {component && <div className="flex items-center gap-4">{component?.map((item, index: number) => <React.Fragment key={`header-item-${index}`}>{item}</React.Fragment>)}</div>}
    </div>
  );
}

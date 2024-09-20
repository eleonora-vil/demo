import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { splitPathToArray } from '@/lib/breadscrum/splitPathToArray';
import { cn } from '@/utils';

export default function MyBreadscumb() {
  const pathName = useLocation().pathname;
  const [breadcrumbPath, setBreadcrumbPath] = useState<any[]>([]);
  useEffect(() => {
    setBreadcrumbPath(splitPathToArray(pathName));
  }, [pathName]);
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <div className="flex items-center gap-2">
            <BreadcrumbItem>
              <Link to={'/'}>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </div>
          {breadcrumbPath.map((breadcrumb, index) => {
            return (
              <div key={index} className="flex items-center gap-2">
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink asChild>
                    <Link
                      to={breadcrumb.path}
                      className={cn({
                        'text-blue-600 hover:text-blue-700': index === breadcrumbPath.length - 1,
                      })}
                    >
                      {breadcrumb.label}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index !== breadcrumbPath.length - 1 && <BreadcrumbSeparator />}
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

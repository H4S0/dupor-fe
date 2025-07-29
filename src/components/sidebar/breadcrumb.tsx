import { Slash } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useLocation } from 'react-router-dom';
import React from 'react';

export function Bread() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const toLabel = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-primary font-semibold">
        <BreadcrumbItem>
          <BreadcrumbLink>Home</BreadcrumbLink>
        </BreadcrumbItem>

        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1;
          const to = '/' + pathnames.slice(0, index + 1).join('/');

          return (
            <React.Fragment key={to}>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>

              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{toLabel(value)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink>{toLabel(value)}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

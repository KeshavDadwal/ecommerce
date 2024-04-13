'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface Breadcrumb {
  breadcrumb: string;
  href: string;
}

export function convertBreadcrumbTitle(string: string) {
  return string
    .replace(/-/g, ' ')
    .replace(/oe/g, 'ö')
    .replace(/ae/g, 'ä')
    .replace(/ue/g, 'ü')
    .toLowerCase();
}

export default function useBreadcrumb(): Breadcrumb[] {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[] | null>(null);

  useEffect(() => {
    if (pathname) {
      const linkPath = pathname.split('/');
      linkPath.shift();
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: convertBreadcrumbTitle(path),
          href: '/' + linkPath.slice(0, i + 1).join('/'),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [pathname]);

  return breadcrumbs || [];
}

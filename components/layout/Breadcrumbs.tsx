import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { JsonLd, generateBreadcrumbSchema } from '../seo/JsonLd';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const allItems = [{ name: 'Home', url: '/' }, ...items];

  const schemaData = generateBreadcrumbSchema(
    allItems.map((item) => ({ name: item.name, item: item.url }))
  );

  return (
    <>
      <JsonLd data={schemaData} />
      <nav aria-label="Breadcrumb" className={`text-xs text-slate-500 py-3 ${className}`}>
        <ol className="flex flex-wrap items-center gap-1.5 list-none p-0 m-0">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            return (
              <li key={item.url} className="flex items-center gap-1.5">
                {index > 0 && <ChevronRight className="w-3 h-3 text-slate-400" />}
                {isLast ? (
                  <span className="font-semibold text-slate-800" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="hover:text-blue-600 transition-colors flex items-center gap-1"
                  >
                    {index === 0 && <Home className="w-3 h-3" />}
                    <span>{item.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

import type { CSSProperties, ReactNode } from 'react';

import AdminPagination from '@/shared/components/AdminPagination';
import type { AdminPaginationProps } from '@/shared/components/AdminPagination';
import { cn } from '@/shared/utils/cn';

type AdminTableAlign = 'left' | 'center' | 'right';
type AdminTableSize = CSSProperties['width'];

export type AdminTableColumn<T> = {
  key: string;
  header: ReactNode;
  render: (row: T, index: number) => ReactNode;
  width?: AdminTableSize;
  minWidth?: AdminTableSize;
  align?: AdminTableAlign;
  headerAlign?: AdminTableAlign;
  truncate?: boolean;
  cellClassName?: string;
  headerClassName?: string;
};

interface AdminTableProps<T> {
  columns: readonly AdminTableColumn<T>[];
  data: readonly T[];
  getRowKey: (row: T, index: number) => string | number;
  minRows?: number;
  tableMinWidth?: AdminTableSize;
  getRowClassName?: (row: T, index: number) => string | undefined;
  pagination: AdminPaginationProps;
  ariaLabel?: string;
  className?: string;
  tableClassName?: string;
}

const ALIGN_CLASS_MAP: Record<AdminTableAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const getRowBackgroundClassName = (index: number) => {
  return index % 2 === 0 ? 'bg-secondary-100' : 'bg-white';
};

const AdminTable = <T,>({
  columns,
  data,
  getRowKey,
  minRows,
  tableMinWidth,
  getRowClassName,
  pagination,
  ariaLabel,
  className,
  tableClassName,
}: AdminTableProps<T>) => {
  const normalizedMinRows = Math.max(0, Math.floor(minRows ?? 0));
  const emptyRowCount = Math.max(0, normalizedMinRows - data.length);
  const emptyRowList = Array.from({ length: emptyRowCount });

  return (
    <div className={cn('w-full', className)}>
      <div className='w-full overflow-x-auto'>
        <div className='w-full overflow-hidden rounded-[20px]' style={{ minWidth: tableMinWidth }}>
          <table
            aria-label={ariaLabel}
            className={cn(
              'w-full table-fixed border-separate border-spacing-0 typo-body-2 text-black',
              tableClassName,
            )}
          >
            <colgroup>
              {columns.map((column) => (
                <col
                  key={column.key}
                  style={{ width: column.width ?? column.minWidth, minWidth: column.minWidth }}
                />
              ))}
            </colgroup>

            <thead className='bg-secondary-200 text-secondary-900'>
              <tr className='h-10'>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    scope='col'
                    className={cn(
                      'h-10 px-2 py-0 align-middle font-medium first:pl-4 last:pr-4',
                      ALIGN_CLASS_MAP[column.headerAlign ?? column.align ?? 'left'],
                      column.headerClassName,
                    )}
                  >
                    <div className='min-w-0 overflow-hidden text-ellipsis whitespace-nowrap'>
                      {column.header}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={getRowKey(row, rowIndex)}
                  className={cn(
                    'h-10',
                    getRowBackgroundClassName(rowIndex),
                    getRowClassName?.(row, rowIndex),
                  )}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        'h-10 px-2 py-0 align-middle font-medium first:pl-4 last:pr-4',
                        ALIGN_CLASS_MAP[column.align ?? 'left'],
                        column.cellClassName,
                      )}
                    >
                      <div
                        className={cn(
                          'min-w-0',
                          column.truncate && 'overflow-hidden text-ellipsis whitespace-nowrap',
                        )}
                      >
                        {column.render(row, rowIndex)}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}

              {emptyRowList.map((_, emptyRowIndex) => {
                const rowIndex = data.length + emptyRowIndex;

                return (
                  <tr
                    key={`empty-row-${emptyRowIndex}`}
                    aria-hidden
                    className={cn('h-10', getRowBackgroundClassName(rowIndex))}
                  >
                    {columns.map((column) => (
                      <td key={column.key} className='h-10 px-2 py-0' />
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <AdminPagination {...pagination} className={cn('mt-4', pagination.className)} />
    </div>
  );
};

export default AdminTable;

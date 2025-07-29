import { ReactNode } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';

export interface Column<T> {
  header: string;
  cell: (row: T) => ReactNode;
}

interface TableProps<T> {
  data: T[] | undefined;
  columns: Column<T>[];
}

export function GenericTable<T>({ data, columns }: TableProps<T>) {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader className="bg-table-header">
          <TableRow>
            {columns.map((col, index) => (
              <TableHead key={index} className="font-medium">
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center py-8 text-muted-foreground"
              >
                No classes found
              </TableCell>
            </TableRow>
          ) : (
            data?.map((row, index) => (
              <TableRow key={index} className="hover:bg-table-rowHover">
                {columns.map((col, index) => (
                  <TableCell key={index}>{col.cell(row)}</TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

"use client";

import * as React from "react";
import {Card} from "@/components/ui/card"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: Entry[] = [
  {
    id: "1",
    name: "massager",
    price: 100,
    shippingtype: "US",
    profit: 100,
    listed: true,
    date: new Date(),
  },
  {
    id: "2",
    name: "phone",
    price: 100,
    shippingtype: "US",
    profit: 100,
    listed: true,
    date: new Date(),
  },
  {
    id: "3",
    name: "laptop",
    price: 100,
    shippingtype: "US",
    profit: 100,
    listed: false,
    date: new Date(),
  },
  {
    id: "4",
    name: "watch",
    price: 100,
    shippingtype: "US",
    profit: 100,
    listed: true,
    date: new Date(),
  },
  {
    id: "5",
    name: "book",
    price: 100,
    shippingtype: "US",
    profit: 100,
    listed: false,
    date: new Date(),
  },
  {
    id: "6",
    name: "shoes",
    price: 100,
    shippingtype: "US",
    profit: 100,
    listed: true,
    date: new Date(),
  },
];

export type Entry = {
  id: string;
  name: string;
  price: number;
  shippingtype: string;
  profit: number;
  listed: boolean;
  date: Date;
};

export const columns: ColumnDef<Entry>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    id: "price",
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div>{row.getValue("price")}</div>,
  },
  {
    id: "shippingtype",
    accessorKey: "shippingtype",
    header: "Shipping Type",
    cell: ({ row }) => <div>{row.getValue("shippingtype")}</div>,
  },
  {
    id: "profit",
    accessorKey: "profit",
    header: "Profit",
    cell: ({ row }) => <div>{row.getValue("profit")}</div>,
  },
  {
    id: "listed",
    accessorKey: "listed",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("listed") ? <p className="text-green-500 font-bold">Listed</p> : <p  className="text-red-500 font-bold">Unlisted</p>}</div>,
  },
  {
    id: "date",
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const d = new Date(row.getValue("date"));
      return <div>{d.toLocaleDateString()}</div>;
    },
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

export default function Records() {
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  return (
    <Card>
        <div className="w-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    </Card>
  );
}

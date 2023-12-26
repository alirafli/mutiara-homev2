"use client";

import React, { useMemo } from "react";
import { redirect } from "next/navigation";
import { useAppSelector } from "@/hooks/useRedux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columns } from "./column";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import AddDataModal from "@/components/ui/addDataModal";
import { Report } from "@/types/report";
import { Button } from "@/components/ui/button";
import AddReport from "../AddReport";

interface ReportTableProps {
  report: Report[];
}

const ReportTable = ({ report }: ReportTableProps) => {
  const { userId } = useAppSelector((state) => state.persistUserReducer);
  const [modal, setModal] = React.useState(false);

  const reportFilter = useMemo(
    () => report.filter((e) => e.user_id.id === userId),
    [report, userId]
  );

  if (!userId) {
    redirect("/");
  }

  const handleModalOpen = (value: boolean) => {
    setModal(value);
  };

  const table = useReactTable({
    data: reportFilter,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),

    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
  });

  return (
    <div className="max-w-screen-xl items-center justify-between px-4 mx-auto mt-24">
      <div className="rounded-md border">
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <AddDataModal
          triggerTitle="Tambah Data"
          title="Tambah keluhan"
          modal={modal}
          handleModalOpen={handleModalOpen}
        >
          <AddReport handleModalOpen={handleModalOpen} />
        </AddDataModal>

        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Sebelumnya
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Selanjutnya
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportTable;

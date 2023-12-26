"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { toast } from "@/components/ui/use-toast";
import { Report } from "@/types/report";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { LuArrowDownUp } from "react-icons/lu";
import ActionDataModal from "@/components/ui/actionDataModal";
import AlertActionModal from "@/components/ui/AlertActionModal";

const renderStatus = (status: string) => {
  return (
    <div
      className={`font-medium w-fit py-1 px-3 rounded-full ${
        status === "selesai"
          ? "bg-green-600 text-white"
          : status === "proses"
          ? "bg-yellow-300"
          : "bg-zinc-800 text-white"
      }`}
    >
      {status}
    </div>
  );
};

export const columns: ColumnDef<Report>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return `#${value.slice(0, 5)}`;
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Judul Keluhan
          <LuArrowDownUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Jenis Keluhan",
  },
  {
    accessorKey: "status",
    header: "status",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return renderStatus(value);
    },
  },
  {
    id: "action",

    enableHiding: false,
    cell: ({ row }) => {
      const reportData = row.original;
      const reportIdSlice = reportData.id?.slice(0, 5);

      const deleteReport = async () => {
        // if (result.error && result.error.message) {
        //   toast({
        //     title: `gagal menghapus ${reportIdSlice}`,
        //   });
        // } else {
        //   toast({
        //     title: `berhasil menghapus ${reportIdSlice}`,
        //   });
        // }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <div className="flex flex-col pl-2">
              <ActionDataModal
                trigger="Detail"
                title={`${reportData.title}`}
                status={<Badge>View</Badge>}
              >
                <h1>detailed contet</h1>
              </ActionDataModal>

              <ActionDataModal
                trigger="Update"
                title={`${reportData.title}`}
                status={<Badge>Edit</Badge>}
              >
                <h1>updated modal</h1>
              </ActionDataModal>
            </div>

            <DropdownMenuSeparator />
            <AlertActionModal
              buttonText={`Hapus #${reportIdSlice}`}
              title="apakah anda yakin?"
              description={`laporan #${reportIdSlice} akan dihapus secara permanen!`}
              onContinue={deleteReport}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

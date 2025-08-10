"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columns } from "./table-columns";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { Files } from "@/models/wing-files";
import FileNotFoundErr from "../file-not-found-err";

export default function FilesDataTable({ path }: { path: string }) {
  console.log("Rebuild")
  const [data, setData] = useState<Files[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingErr, setLoadingErr] = useState(false);
  const router = useRouter();

  const table = useReactTable({
    columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    const fetchfiles = async () => {
       setLoadingErr(false);
      try {
        table.reset();
        setLoading(true);

        const res = await fetch("http://localhost:8080/files/ls" + path);

        if (res.status != 200) {
          throw res.status;
        }
        const json = (await res.json()).files;
        setData(json);
      } catch (err) {
        setTimeout(() => toast.error("Folder not found!"), 400);
        setLoadingErr(true)
        console.error("Error fetching data:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchfiles();
  }, [path]);

  return (
    <>
      <Toaster />
      {loading ? (
        <div>
          <Skeleton className="h-30 mt-8 rounded-md" />
        </div>
      ) : (
        <>
        {
          loadingErr ? <FileNotFoundErr /> :
          <div className="overflow-hidden rounded-md border mt-8 bg-sidebar shadow-lg">
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
              { 
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    onClick={
                      row.original.dir
                        ? () => {
                            setLoading(true);
                            router.push(
                              "files?path=" + path + row.original.name
                            );
                          }
                        : undefined
                    }
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
              }
            </TableBody>
          </Table>
        </div>
        }
        
        </>
      )}
    </>
  );
}

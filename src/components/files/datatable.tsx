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
import { notFound, useRouter } from "next/navigation";
import { Files, FilesResponse } from "@/models/wing";
import { fetchWing } from "@/utils/wing/fetch-wing";


export default function FilesDataTable({ path }: { path: string }) {
  console.log("Rebuild");
  const [data, setData] = useState<Files[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const table = useReactTable({
    columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    const fetchfiles = async () => {

      try {
        table.reset();
        setLoading(true);

        const res = await fetchWing("http://localhost:8080/files/ls" + path);

        if (res.status != 200) {
          throw res.status;
        }
        const json: FilesResponse = await res.json();
        setData(
          json.files.sort((a, b) => {
            if (a.dir && !b.dir) return -1;
            if (!a.dir && b.dir) return 1;
            return a.name.localeCompare(b.name);
          })
        );
      } catch (err) {
        
        console.error("Error fetching data:", err);
        console.log("NOTFOUND")
        notFound();
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
      ) : 
        <>
           
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
                  {table.getRowModel().rows.map((row) => (
                    <TableRow
                      
                  
                     
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                        style={{ pointerEvents: "initial"}}
                         onClick={
                        row.original.dir
                          ? (e) => {
                            e.preventDefault();
                              setLoading(true);
                              router.push(
                                "files?path=" + path + row.original.name
                              );
                            }
                          : undefined
                      }
                        key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          
        </>
      }
    </>
  );
}

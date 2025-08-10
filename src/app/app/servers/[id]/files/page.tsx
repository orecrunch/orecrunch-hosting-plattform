"use client";
import { useSearchParams } from "next/navigation";
import FilesBreadCrump from "@/components/files/breadcrump";
import FilesDataTable from "@/components/files/datatable";


export default function FilesPage() {
  console.log("rebuild");
  const searchparams = useSearchParams();

  let path = searchparams.get("path");
  if (!path) {
    path = "/";
  }

  if (!path.startsWith("/")) {
    path = "/" + path;
  }
  return (
    <>
      <h1 className="text-2xl font-semibold mb-1.5">Your Files</h1>
      <FilesBreadCrump path={path} />
      <FilesDataTable path={path} />
    </>
  );
}

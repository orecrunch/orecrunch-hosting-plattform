"use client";
import dynamic from "next/dynamic";
import { useParams, useSearchParams } from "next/navigation";

const Editor = dynamic(() => import("@/components/files/editor"), {
  ssr: false,
});

export default function EditorPage() {
  const searchparams = useSearchParams();
 const params = useParams();


  let searchpath = searchparams.get("path");
  if (!searchpath) {
    searchpath = "/";
  }

  if (!searchpath.startsWith("/")) {
    searchpath = "/" + searchpath;
  }


  return <Editor post_url={"http://localhost:8080/" + params.id + "/files/wr" + searchpath} fetch_url={"http://localhost:8080/" + params.id + "/files/rd" + searchpath} />
 
}

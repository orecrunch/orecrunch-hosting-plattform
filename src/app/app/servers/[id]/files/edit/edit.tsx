"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

const Editor = dynamic(() => import("@/components/files-editor"), {
  ssr: false,
});

export default function EditorPage({ post_url, fetch_url }: { fetch_url: string, post_url: string }) {
  const searchparams = useSearchParams();

  let searchpath = searchparams.get("path");
  if (!searchpath) {
    searchpath = "/";
  }

  if (!searchpath.startsWith("/")) {
    searchpath = "/" + searchpath;
  }


  return <Editor post_url={post_url + searchpath} fetch_url={fetch_url + searchpath} />
 
}

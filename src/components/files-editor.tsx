"use client";
import { useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { Button } from "./ui/button";
import { Toaster, toast } from "sonner";
import FileNotFoundErr from "./file-not-found-err";

export default function Editor({ post_url, fetch_url }: { fetch_url: string, post_url: string }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(true);
  console.log(fetch_url)
  console.log(post_url)

  async function fetchContent() {
    try {
      setLoading(true)
      const res = await fetch(
        fetch_url
      );
      setContent(await res.text());
    } catch (e) {
      console.log(e);
      setTimeout(() => toast.error("Sry Error while fetching file"), 400)
    } finally {
     setLoading(false)
    }
  }

  async function postContent() {
    try {
      const res = await fetch(
        post_url,
        {
          method: "POST",
          body: content,
        }
      );
      if (res.status != 200) {
        throw "Could not save file";
      }
    } catch (e) {
      console.log(e);
      setTimeout(() => toast.error("Sry Error while fetching file"), 400)
    }
  }

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <>
    <Toaster />
    {
      err ? 
      <FileNotFoundErr />
      :
      <>
       {loading ? <div>Loading...</div> : 
      <MonacoEditor
        height="800px"
        language="json"
        theme="vs-dark"
        value={content}
        onChange={(c) => setContent(c)}
      />
      }
      <Button onClick={postContent}>Save</Button>
      </>
     
    }
      
      
    </>
  );
}

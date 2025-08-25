"use client";
import { useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import { notFound, useParams } from "next/navigation";
import { fetchWing } from "@/utils/wing/fetch-wing";
var test  = 1;
export default function Editor({ post_url, fetch_url }: { fetch_url: string, post_url: string }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);


  async function fetchContent() {
     
    try {
      test++;
      console.log("getting data" + test)
      setLoading(true)
      const res = await fetchWing(
        fetch_url
      );
      setContent(await res.text());
    } catch (e) {
      console.log(e);
      notFound();
    } finally {
     setLoading(false)
    }
  }

  async function postContent() {
    try {
      const res = await fetchWing(
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

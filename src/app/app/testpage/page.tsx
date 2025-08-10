"use client";

import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

export default function testpage() {
  return (
    <>
      <div className="h-full flex flex-col">
        <Editor codeurl="https://localhost:8080/" />
      </div>
    </>
  );
}

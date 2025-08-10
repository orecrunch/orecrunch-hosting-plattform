"use client";
import { FormEvent, KeyboardEventHandler, Ref, RefObject, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Card } from "../ui/card";
import dynamic from "next/dynamic";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowBigRight, ArrowRight } from "lucide-react";



export default function Console(){  const [inputValue, setInputValue] = useState("");

  const ref = useRef<HTMLInputElement>(null);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") sendCommand();
  }
  function sendCommand() {
    if (inputValue.length <= 0) return;
  
    
    // socket.send(
    //   JSON.stringify({
    //     event: "console",
    //     console_io: inputValue + "\n",
    //   })
    // );
    setInputValue("");

  
  }

    useEffect(() => {
      const element = document.getElementById("test")!
      
      element.onkeydown = () => {
        console.log("key down!!!");
      }
    })
  return (
    <Card className=" 2xl:row-span-3 row-span-2 xl:col-span-3 lg:col-span-2 col-span-1 gap-0 py-0 overflow-hidden p-2">
      <div className="overflow-hidden h-full w-full rounded-sm " id="terminal" />
           <div className="flex w-full items-center gap-2">
      <Input
      id="test"
        type="text"
        placeholder="Write a command..."
        autoComplete="off"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button type="submit" variant="outline" onClick={sendCommand}>
        Send <ArrowRight />
      </Button>
    </div>
    </Card>
  );
}



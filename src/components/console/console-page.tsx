"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowRight, Copy } from "lucide-react";
import { Button } from "../ui/button";

import ConsoleGraphCard from "@/components/console/console-graph-card";
import ConsoleGrid from "@/components/console/console-grid";
import { useEffect, useRef, useState } from "react";
import { ChartConfig } from "../ui/chart";
import { Terminal } from "@xterm/xterm";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Toaster, toast } from "sonner";
import ConsoleGraphCardDuo from "./console-graph-card-duo";


const GRAPH_RESOLUTION = 30;

export default function ConsolePage({ serverId }: { serverId: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [chartData, setChartData] = useState<WebsocketStats[]>(
    Array.from(
      { length: GRAPH_RESOLUTION },
      (): WebsocketStats => ({
        memory_gigabytes: 0,
        memory_gigabytes_limit: 0,
        cpu_load: 0,
        rx_kilobytes: 0,
        rt_kilobytes: 0,
        state: "",
        timestamp: 0,
      })
    )
  );

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--chart-2)",
    },
    mobile: {
      label: "Mobile",
      color: "var(--chart-4)",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8080/ws/${serverId}`);

    let terminal: Terminal | undefined;
    const configureSocketsTerminal = async () => {
      const { createTerminal } = await import("@/utils/terminal/client");
      terminal = createTerminal();

      socket.addEventListener("message", (event) => {
        const data: WebsocketJson = JSON.parse(event.data);
        if (data.stats) {
          const stats = data.stats;
          setChartData((prevData) => [...prevData.slice((GRAPH_RESOLUTION * -1) -1), stats]);
        }
        if (data.console) {
          terminal!.write(data.console);
        }
      });

      //Resets terminal if websocket breaks
      socket.addEventListener("close", () => {
        toast.info("Websocket closed");
        terminal!.clear();
        terminal!.reset();
        terminal!.writeln("[OreCrunch] Socket Closed...");
      });

      
      socket.send(
        JSON.stringify({
          event: "sendPreviousLogs",
        })
      );

      //Listen on Input field ans sends message to the websocket console
      const input = inputRef.current!;
      input.onkeyup = (data) => {
        if (data.code === "Enter") {
          if (input.value === "" || input.value === " ") {
            return;
          }
          terminal!.write(input.value + "\n");
          socket.send(
            JSON.stringify({
              event: "console",
              console: input.value + "\n",
            })
          );
          input.value = "";
        }
      };
    };

    configureSocketsTerminal().catch((e) => console.log(e));

    return () => {
      socket.close();

      if (terminal) {
        terminal.dispose();
      }
    };
  }, [serverId]);
  
  return (
    <>
    <Toaster />
      <div className="w-full flex sm:flex-row flex-col gap-5 justify-between sm:items-center pb-6 ">
        <div>
        <h1 className="text-2xl font-semibold">The Recomming.</h1>
          <span className="flex gap-1">
            <h2 className="text-sm  text-muted-foreground">
              IP: john.play.orecrunch.com
            </h2>

            <Tooltip>
              <TooltipTrigger asChild>
                <Copy className="h-3 w-3 mt-1.5" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy</p>
              </TooltipContent>
            </Tooltip>
          </span>
            
        </div>
        <div className="gap-4 flex">
          <Button variant="outline" className="w-20">
            Start
          </Button>
          <Button variant="outline" className="w-20">
            Stop
          </Button>
          <Button variant="outline" className="w-20">
            Kill
          </Button>
        </div>
      </div>
      <ConsoleGrid>
        <Card className=" 2xl:row-span-3 row-span-2 xl:col-span-3 lg:col-span-2 col-span-1 gap-0 py-0 overflow-hidden p-2">
          <div
            className="overflow-hidden h-full w-full rounded-sm "
            id="terminal"
          />
          <div className="flex w-full items-center gap-2">
            <Input
              type="text"
              placeholder="Write a command..."
              autoComplete="off"
              ref={inputRef}
            />
            <Button type="submit" variant="outline">
              Send <ArrowRight />
            </Button>
          </div>
        </Card>
        <ConsoleGraphCard
        title="CPU Load"
        formatter={(value) => value + "%" }
          data={chartData}
          chartConfig={chartConfig}
          dataKey={"cpu_load"}
        />
        <ConsoleGraphCard
        title="Memory Usage"
        formatter={(value) => value + "GB" }
          data={chartData}
          chartConfig={chartConfig}
          dataKey={"memory_gigabytes"}
        />
        <ConsoleGraphCardDuo
        title="Network Usage"
        formatter={(value) => {
          if (value >= 1000) {
                return (value / 1000 )+ "MB";
              }
              return value + "KB";
        } }
          data={chartData}
          chartConfig={chartConfig}
          dataKey={"rx_kilobytes"}
          secondaryDataKey={"rt_kilobytes"}
        />
      </ConsoleGrid>
    </>
  );
}

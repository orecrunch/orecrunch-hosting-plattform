import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Plus } from "lucide-react";
import Image from "next/image";
import DefaultServer from "@/../public/default-server.png";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ServerCard from "@/components/server-card";
export default function ServersPage() {
  return (
    <div className="h-full w-full flex flex-col items-center py-14 px-16 gap-3">
      <div className="w-full flex justify-between mb-5">
        <h2 className="text-2xl font-semibold">Your Servers.</h2>
        <Button size="sm">
          <Plus />
          Add Server
        </Button>
      </div>
      <ServerCard />

      
    </div>
  );
}

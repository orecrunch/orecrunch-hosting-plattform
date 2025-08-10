"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Copy } from "lucide-react";
import Image from "next/image";
import DefaultServer from "@/../public/default-server.png";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

export default function ServerCard() {
  const router = useRouter();
return       <Card onClick={() => router.push("servers/6bdfaedf3278bafe2e5e372fc34a629a4a960cac275f1a4d1e3611b9d205f2a7/console")} className="w-full h-23 justify-center py-2.5">
        <CardContent className="h-full w-full px-2.5 flex flex-row gap-2.5">
          <Image
            src={DefaultServer}
            alt="srv"
            className="h-full w-fit object-cover rounded-md aspect-square"
          />
          <div>
            <h1 className="text-lg font-medium">Minecraft Server</h1>
            <span className="flex gap-1">
              <h2 className="text-sm text-muted-foreground">
                IP: john.play.orecrunch.com
              </h2>
              <Tooltip >
                <TooltipTrigger asChild>
                  <Copy className="h-3 w-3 mt-1" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy</p>
                </TooltipContent>
              </Tooltip>
            </span>
          </div>
        </CardContent>
      </Card>
}
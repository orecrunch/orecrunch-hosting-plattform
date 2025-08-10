"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";



export default function ConsoleGraphCardDuo({ data, chartConfig, dataKey, secondaryDataKey, title, formatter }: { data: WebsocketStats[], chartConfig: ChartConfig, dataKey : string, secondaryDataKey: string,title: string, formatter: (value: any, index: number) => string  }) {



  return (
    <Card className=" row-span-1 col-span-1 py-0 gap-0">
      <CardTitle className="mx-12 my-4 text-accent-foreground">
        {title}
      </CardTitle>
      <ChartContainer
        config={chartConfig}
        className="max-h-[100%] aspect-auto flex-1 rounded-md overflow-hidden mr-4 mb-4"
      >
        <AreaChart
          accessibilityLayer
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: -12,
            bottom: 0,
          }}
        >
          <CartesianGrid vertical={false} />
          <YAxis
            tickMargin={1}
            tickLine={false}
            axisLine={true}
            tickFormatter={formatter}
          />
          <ChartTooltip
            cursor={true}
            content={<ChartTooltipContent indicator="line" />}
          />

          <defs>
            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-desktop)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-desktop)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-mobile)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-mobile)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
          isAnimationActive={false}
            dataKey={dataKey}
            type="linear"
            fill="url(#fillDesktop)"
            stroke="var(--color-desktop)"
          />
          <Area
          isAnimationActive={false}
            dataKey={secondaryDataKey}
            type="linear"
            fill="url(#fillMobile)"
            stroke="var(--color-mobile)"
          />
        </AreaChart>
      </ChartContainer>
    </Card>
  );
}

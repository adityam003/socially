"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DataKey = "Reel" | "Image" | "Carousel"; // Define valid keys

// Data mapping for each category (Reel, Image, Carousel)
const dataMap: Record<DataKey, { month: string; desktop: number; fill: string }[]> = {
  Reel: [
    { month: "january", desktop: 405, fill: "var(--color-january)" },
    { month: "february", desktop: 337, fill: "var(--color-february)" },
    { month: "march", desktop: 309, fill: "var(--color-march)" },
    { month: "april", desktop: 286, fill: "var(--color-april)" },
    { month: "may", desktop: 173, fill: "var(--color-may)" },
  ],
  Image: [
    { month: "january", desktop: 205, fill: "var(--color-january)" },
    { month: "february", desktop: 137, fill: "var(--color-february)" },
    { month: "march", desktop: 109, fill: "var(--color-march)" },
    { month: "april", desktop: 86, fill: "var(--color-april)" },
    { month: "may", desktop: 43, fill: "var(--color-may)" },
  ],
  Carousel: [
    { month: "january", desktop: 505, fill: "var(--color-january)" },
    { month: "february", desktop: 437, fill: "var(--color-february)" },
    { month: "march", desktop: 409, fill: "var(--color-march)" },
    { month: "april", desktop: 386, fill: "var(--color-april)" },
    { month: "may", desktop: 273, fill: "var(--color-may)" },
  ],
};

// Chart configuration object
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
  january: {
    label: "Views",
    color: "hsl(var(--chart-1))",
  },
  february: {
    label: "Likes",
    color: "hsl(var(--chart-2))",
  },
  march: {
    label: "Share",
    color: "hsl(var(--chart-3))",
  },
  april: {
    label: "Comments",
    color: "hsl(var(--chart-4))",
  },
  may: {
    label: "Downloads",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function Chart5({ name }: { name: DataKey }) {
  const id = "pie-interactive";

  // Dynamically set the data based on the name prop
  const desktopData = React.useMemo(() => dataMap[name], [name]);

  // Manage selected month state
  const [activeMonth, setActiveMonth] = React.useState(desktopData[0]?.month || "");

  // Determine activeIndex based on activeMonth
  const activeIndex = React.useMemo(
    () => desktopData.findIndex((item) => item.month === activeMonth),
    [activeMonth, desktopData]
  );

  // Extract months from the data
  const months = React.useMemo(() => desktopData.map((item) => item.month), [desktopData]);

  return (
    <Card data-chart={id} className="w-full flex flex-col rounded-[15px] md:rounded-[35px]">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle className="text-md">Best Performing {name} Metrics</CardTitle>
          <CardDescription>Proportion of engagement types for {name}.</CardDescription>
        </div>
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {months.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig];

              if (!config) {
                return null;
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={desktopData}
              dataKey="desktop"
              nameKey="month"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {desktopData[activeIndex].desktop.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

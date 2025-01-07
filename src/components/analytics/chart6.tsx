"use client";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart } from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartDataEntry {
  browser: string;
  visitors: number;
  fill: string;
}

// Data mapping for different categories (Reel, Image, Carousel, etc.)
const dataMap: Record<string, ChartDataEntry[]> = {
  Reel: [
    { browser: "#InstaReels", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "#Fitness", visitors: 200, fill: "var(--color-safari)" },
    { browser: "#BTS", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "#Foodie", visitors: 173, fill: "var(--color-edge)" },
    { browser: "#Memes", visitors: 90, fill: "var(--color-other)" },
  ],
  Image: [
    { browser: "#Art", visitors: 220, fill: "var(--color-chrome)" },
    { browser: "#Photography", visitors: 180, fill: "var(--color-safari)" },
    { browser: "#Nature", visitors: 160, fill: "var(--color-firefox)" },
    { browser: "#Portrait", visitors: 130, fill: "var(--color-edge)" },
    { browser: "#Abstract", visitors: 95, fill: "var(--color-other)" },
  ],
  Carousel: [
    { browser: "#Fashion", visitors: 260, fill: "var(--color-chrome)" },
    { browser: "#Travel", visitors: 230, fill: "var(--color-safari)" },
    { browser: "#Adventure", visitors: 210, fill: "var(--color-firefox)" },
    { browser: "#Sports", visitors: 180, fill: "var(--color-edge)" },
    { browser: "#Comedy", visitors: 150, fill: "var(--color-other)" },
  ],
};

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-2))",
  },
  chrome: {
    label: "Reels",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Fitness",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "BTS",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Foodie",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Memes",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

interface ChartProps {
  name: string;
}

export default function Chart6({ name }: ChartProps) {
  // Dynamically select data based on the `name` prop
  const chartData = dataMap[name];

  return (
    <Card className="flex flex-col w-full bg-white rounded-[15px] md:rounded-[35px]">
      <CardHeader className="items-start pb-0">
        <CardTitle className="text-lg">Trending {name} Types</CardTitle>
        <CardDescription>
          Identify the most popular formats of {name} currently trending.
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-8">
        <ChartContainer config={chartConfig} className="mx-auto aspect-video max-h-[250px]">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 24,
              left: 24,
              right: 24,
            }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  nameKey="visitors"
                  hideLabel
                />
              }
            />
            <Line
              dataKey="visitors"
              type="natural"
              stroke="var(--color-visitors)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-visitors)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                dataKey="browser"
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start mt-6 gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}

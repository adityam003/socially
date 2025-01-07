"use client";
import React, { useState, useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer, Cell } from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartDataEntry {
  date: string;
  desktop: number;
  mobile: number;
}

// Data mapping for different categories (Reel, Image, Carousel)
const dataMap: Record<string, ChartDataEntry[]> = {
  Reel: [
    { date: "#InstaReels", desktop: 222, mobile: 150 },
    { date: "#Fitness", desktop: 35, mobile: 180 },
    { date: "#BTS", desktop: 167, mobile: 120 },
    { date: "#Foodie", desktop: 62, mobile: 260 },
    { date: "#Memes", desktop: 373, mobile: 290 },
    { date: "#TechTalk", desktop: 31, mobile: 340 },
  ],
  Image: [
    { date: "#Art", desktop: 150, mobile: 100 },
    { date: "#Photography", desktop: 200, mobile: 220 },
    { date: "#Nature", desktop: 90, mobile: 300 },
    { date: "#Landscape", desktop: 180, mobile: 250 },
    { date: "#Portrait", desktop: 210, mobile: 150 },
    { date: "#Abstract", desktop: 130, mobile: 80 },
  ],
  Carousel: [
    { date: "#Fashion", desktop: 170, mobile: 140 },
    { date: "#Travel", desktop: 230, mobile: 210 },
    { date: "#Adventure", desktop: 110, mobile: 280 },
    { date: "#Lifestyle", desktop: 290, mobile: 220 },
    { date: "#Sports", desktop: 150, mobile: 130 },
    { date: "#Comedy", desktop: 200, mobile: 260 },
  ],
};

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface ChartProps {
  name: string;
}

export default function Chart4({ name }: ChartProps) {
  const [activeChart] = useState<keyof typeof chartConfig>("desktop");

  // Dynamically choose data based on the `name` prop
  const chartData = useMemo(() => dataMap[name], [name]);

  const getBarColor = (entry: ChartDataEntry): string => {
    return entry.desktop < entry.mobile ? "url(#fillDesktop1)" : "url(#fillDesktop2)";
  };

  return (
    <Card className="w-full bg-white rounded-[15px] md:rounded-[35px]">
      <CardHeader>
        <CardTitle className="text-lg">{name} Hashtag Performance</CardTitle>
        <CardDescription>Top-performing hashtags for {name} across Reels.</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[285px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ChartContainer config={chartConfig}>
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} />
                <XAxis dataKey="date" />
                <ChartTooltip
                  content={<ChartTooltipContent className="w-[150px]" nameKey="views" />}
                />
                <defs>
                  <linearGradient id="fillDesktop1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="10%" stopColor="var(--color-desktop)" stopOpacity={0.6} />
                    <stop offset="70%" stopColor="var(--color-desktop)" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <defs>
                  <linearGradient id="fillDesktop2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="15%" stopColor="var(--color-mobile)" stopOpacity={0.6} />
                    <stop offset="70%" stopColor="var(--color-mobile)" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <Bar dataKey={activeChart}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

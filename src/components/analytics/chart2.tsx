"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "Entertainment", desktop: 186, mobile: 80 },
  { month: "Tech", desktop: 305, mobile: 200 },
  { month: "Education", desktop: 237, mobile: 120 },
  { month: "Motivation", desktop: 73, mobile: 190 },
  { month: "Music", desktop: 209, mobile: 130 },
  { month: "Memes", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "2025",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "2024",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function Chart2() {
  return (
    <Card className="w-full md:w-1/3 bg-white rounded-[15px] md:rounded-[35px]">
      <CardHeader className="items-center pb-4 ">
        <CardTitle className="text-lg">Trending Topics</CardTitle>
        <CardDescription>
        Most discussed or searched topics across all posts
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0 mt-4">
        <ChartContainer
          config={chartConfig}
          className="h-[300px] w-full"
        >
          <RadarChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              bottom: 10,
              left: 10,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis
              dataKey="month"
              tick={({ x, y, textAnchor,  index, ...props }) => {
                const data = chartData[index]

                return (
                  <text
                    x={x}
                    y={index === 0 ? y - 10 : y}
                    textAnchor={textAnchor}
                    fontSize={13}
                    fontWeight={500}
                    {...props}
                  >
                    <tspan>{data.desktop}</tspan>
                    <tspan className="fill-muted-foreground">/</tspan>
                    <tspan>{data.mobile}</tspan>
                    <tspan
                      x={x}
                      dy={"1rem"}
                      fontSize={12}
                      className="fill-muted-foreground"
                    >
                      {data.month}
                    </tspan>
                  </text>
                )
              }}
            />

            <PolarGrid />
            <Radar
              dataKey="desktop"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
            />
            <Radar dataKey="mobile" fill="var(--color-mobile)" />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 mt-8 text-sm">
        <div className="flex font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex leading-none text-muted-foreground">
          January - June 2024
        </div>
      </CardFooter>
    </Card>
  )
}

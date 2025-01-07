import React from 'react';
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const salesData = [
  { month: "January", desktop: 1 },
  { month: "February", desktop: 15 },
  { month: "March", desktop: 15 },
  { month: "April", desktop: 35 },
  { month: "May", desktop: 69 },
  { month: "June", desktop: 55 },
  { month: "July", desktop: 69 },
  { month: "August", desktop: 120 },
  { month: "September", desktop: 100 },
  { month: "October", desktop: 150 },
  { month: "November", desktop: 150 },
  { month: "December", desktop: 189 },
];

const productData = [
    { product: "#Foodie", sales: 275, fill: "hsl(var(--chart-1))" },
    { product: "#Fitness", sales: 200, fill: "hsl(var(--chart-2))" },
    { product: "#Travel", sales: 187, fill: "hsl(var(--chart-3))" },
    { product: "#TechTalk", sales: 173, fill: "hsl(var(--chart-4))" },
    { product: "#Motivation", sales: 90, fill: "hsl(var(--chart-5))" },
  ];

const salesChartConfig = {
  desktop: {
    label: "Sales",
    color: "#2b9c90",
  },
};

const productChartConfig = {
  sales: { label: "Products" },
  butane: { label: "Butane", color: "hsl(var(--chart-1))" },
  prop: { label: "Prop", color: "hsl(var(--chart-2))" },
  acetyl: { label: "Acetyl", color: "hsl(var(--chart-3))" },
  meth: { label: "Meth", color: "hsl(var(--chart-4))" },
  other: { label: "Other", color: "hsl(var(--chart-5))" },
};

const Chart1 = () => {
  return (
    <div className="flex flex-col md:flex-row gap-12">
      <Card className="w-full md:w-2/3 bg-white rounded-[15px] md:rounded-[35px]">
        <CardHeader>
          <CardTitle className='text-lg'>Content Growth Over Time</CardTitle>
          <CardDescription>Showing how different types of content have grown (or declined) over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={salesChartConfig} className="h-[300px] w-full">
            <AreaChart
              data={salesData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
               <CartesianGrid vertical={false} horizontal={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
              <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#a3a3e2"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#a3a3e2"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
              <Area type="linear" dataKey="desktop" stroke="#a3a3e2" fill="url(#fillDesktop)" />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex items-center text-sm gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Trending up by 15.2% this month</span>
          </div>
        </CardFooter>
      </Card>

      <Card className="w-full md:w-1/3 bg-white rounded-[15px] md:rounded-[35px]">
        <CardHeader>
          <CardTitle className='text-lg'>Trending Hashtags</CardTitle>
          <CardDescription>January - December 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={productChartConfig} className="h-[300px] w-full">
            <BarChart
              data={productData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false}/>
              <XAxis type="number" />
              <YAxis dataKey="product" type="category" />
              <ChartTooltip />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex items-center text-sm gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Trending up by 5.2% this month</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Chart1;

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart, PieChart } from "lucide-react";

type InsightData = {
  label: string;
  value: number;
  color: string;
};

type TravelInsightsProps = {
  destination?: string;
  insights?: {
    seasonality?: InsightData[];
    pricing?: InsightData[];
    activities?: InsightData[];
  };
};

const TravelInsights = ({
  destination = "Paris, France",
  insights,
}: TravelInsightsProps) => {
  // Sample data if none provided
  const defaultInsights = {
    seasonality: [
      { label: "Jan", value: 60, color: "#E3F2FD" },
      { label: "Feb", value: 65, color: "#BBDEFB" },
      { label: "Mar", value: 75, color: "#90CAF9" },
      { label: "Apr", value: 85, color: "#64B5F6" },
      { label: "May", value: 90, color: "#42A5F5" },
      { label: "Jun", value: 95, color: "#2196F3" },
      { label: "Jul", value: 100, color: "#1E88E5" },
      { label: "Aug", value: 98, color: "#1976D2" },
      { label: "Sep", value: 90, color: "#1565C0" },
      { label: "Oct", value: 80, color: "#0D47A1" },
      { label: "Nov", value: 70, color: "#82B1FF" },
      { label: "Dec", value: 75, color: "#448AFF" },
    ],
    pricing: [
      { label: "Hotels", value: 40, color: "#4CAF50" },
      { label: "Food", value: 25, color: "#FF9800" },
      { label: "Transport", value: 15, color: "#2196F3" },
      { label: "Activities", value: 20, color: "#F44336" },
    ],
    activities: [
      { label: "Museums", value: 35, color: "#9C27B0" },
      { label: "Dining", value: 25, color: "#FF9800" },
      { label: "Shopping", value: 15, color: "#2196F3" },
      { label: "Parks", value: 10, color: "#4CAF50" },
      { label: "Tours", value: 15, color: "#F44336" },
    ],
  };

  const data = insights || defaultInsights;

  // Simple bar chart component
  const BarChartComponent = ({ data }: { data: InsightData[] }) => (
    <div className="h-64 flex items-end justify-between gap-2 mt-4">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className="w-8 rounded-t-sm"
            style={{
              height: `${(item.value / 100) * 200}px`,
              backgroundColor: item.color,
            }}
          ></div>
          <span className="text-xs mt-1 text-[#666]">{item.label}</span>
        </div>
      ))}
    </div>
  );

  // Simple pie chart component
  const PieChartComponent = ({ data }: { data: InsightData[] }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;

    return (
      <div className="flex justify-center mt-4">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const startAngle = (cumulativePercentage / 100) * 360;
              const endAngle =
                ((cumulativePercentage + percentage) / 100) * 360;

              // Convert angles to radians and calculate x,y coordinates
              const startRad = (startAngle - 90) * (Math.PI / 180);
              const endRad = (endAngle - 90) * (Math.PI / 180);

              const x1 = 50 + 50 * Math.cos(startRad);
              const y1 = 50 + 50 * Math.sin(startRad);
              const x2 = 50 + 50 * Math.cos(endRad);
              const y2 = 50 + 50 * Math.sin(endRad);

              // Determine which arc to draw (large or small)
              const largeArcFlag = percentage > 50 ? 1 : 0;

              // Create the SVG arc path
              const pathData = [
                `M 50 50`,
                `L ${x1} ${y1}`,
                `A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `Z`,
              ].join(" ");

              cumulativePercentage += percentage;

              return (
                <path
                  key={index}
                  d={pathData}
                  fill={item.color}
                  stroke="white"
                  strokeWidth="0.5"
                />
              );
            })}
          </svg>
        </div>
        <div className="ml-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center mb-1">
              <div
                className="w-3 h-3 mr-2"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-xs text-[#666]">
                {item.label} ({item.value}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full bg-white border border-[#FFECB3] rounded-xl shadow-md">
      <CardHeader className="border-b border-[#FFECB3]">
        <CardTitle className="text-[#4CAF50]">
          Travel Insights: {destination}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="seasonality">
          <TabsList className="grid grid-cols-3 mb-4 bg-[#FFECB3]/30">
            <TabsTrigger
              value="seasonality"
              className="data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white flex items-center gap-1"
            >
              <LineChart className="h-4 w-4" /> Seasonality
            </TabsTrigger>
            <TabsTrigger
              value="pricing"
              className="data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white flex items-center gap-1"
            >
              <BarChart className="h-4 w-4" /> Budget Breakdown
            </TabsTrigger>
            <TabsTrigger
              value="activities"
              className="data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white flex items-center gap-1"
            >
              <PieChart className="h-4 w-4" /> Popular Activities
            </TabsTrigger>
          </TabsList>

          <TabsContent value="seasonality" className="mt-4">
            <div className="mb-2">
              <h3 className="text-sm font-medium text-[#333]">
                Best Time to Visit
              </h3>
              <p className="text-xs text-[#666]">
                Based on weather, crowds, and pricing factors
              </p>
            </div>
            <BarChartComponent data={data.seasonality || []} />
            <div className="mt-4 text-sm text-[#666] bg-[#FFECB3]/20 p-3 rounded-md">
              <p>
                <span className="font-medium">AI Insight:</span> The best time
                to visit {destination} is during April-May or September-October
                when the weather is pleasant and crowds are smaller. Summer
                months (June-August) are peak tourist season with higher prices.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="mt-4">
            <div className="mb-2">
              <h3 className="text-sm font-medium text-[#333]">
                Typical Budget Allocation
              </h3>
              <p className="text-xs text-[#666]">
                Average spending breakdown for a 7-day trip
              </p>
            </div>
            <PieChartComponent data={data.pricing || []} />
            <div className="mt-4 text-sm text-[#666] bg-[#FFECB3]/20 p-3 rounded-md">
              <p>
                <span className="font-medium">AI Insight:</span> For{" "}
                {destination}, allocate approximately €150-200 per day per
                person. Accommodations represent the largest expense, followed
                by dining. Consider booking accommodations 3-4 months in advance
                for better rates.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="activities" className="mt-4">
            <div className="mb-2">
              <h3 className="text-sm font-medium text-[#333]">
                Popular Activities
              </h3>
              <p className="text-xs text-[#666]">
                What most travelers enjoy in this destination
              </p>
            </div>
            <PieChartComponent data={data.activities || []} />
            <div className="mt-4 text-sm text-[#666] bg-[#FFECB3]/20 p-3 rounded-md">
              <p>
                <span className="font-medium">AI Insight:</span> {destination}{" "}
                is known for its world-class museums and culinary experiences.
                The Louvre and Musée d'Orsay are must-visits, but consider
                purchasing skip-the-line tickets in advance. For authentic
                dining, explore neighborhoods like Le Marais and Saint-Germain.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TravelInsights;

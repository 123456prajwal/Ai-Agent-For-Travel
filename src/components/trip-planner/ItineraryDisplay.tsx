"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MapPin, Utensils, Bed, Plane, Car } from "lucide-react";

interface Activity {
  time: string;
  title: string;
  location: string;
  type: "food" | "attraction" | "transport" | "accommodation";
  description?: string;
}

interface DayPlan {
  date: string;
  activities: Activity[];
}

const mockItinerary: DayPlan[] = [
  {
    date: "Day 1 - Monday, June 10",
    activities: [
      {
        time: "09:00 AM",
        title: "Arrival at Paris Charles de Gaulle Airport",
        location: "Paris, France",
        type: "transport",
        description: "Flight AA123 arrives at Terminal 2E",
      },
      {
        time: "11:00 AM",
        title: "Check-in at Hotel de Paris",
        location: "15 Rue de Rivoli",
        type: "accommodation",
        description: "4-star hotel in central Paris",
      },
      {
        time: "01:00 PM",
        title: "Lunch at Café de Flore",
        location: "172 Boulevard Saint-Germain",
        type: "food",
        description: "Historic café with classic French cuisine",
      },
      {
        time: "03:00 PM",
        title: "Visit the Eiffel Tower",
        location: "Champ de Mars",
        type: "attraction",
        description: "Iconic landmark with panoramic views of Paris",
      },
      {
        time: "07:00 PM",
        title: "Dinner at Le Comptoir",
        location: "9 Carrefour de l'Odéon",
        type: "food",
        description: "Renowned bistro with seasonal French dishes",
      },
    ],
  },
  {
    date: "Day 2 - Tuesday, June 11",
    activities: [
      {
        time: "09:00 AM",
        title: "Breakfast at hotel",
        location: "Hotel de Paris",
        type: "food",
      },
      {
        time: "10:30 AM",
        title: "Visit the Louvre Museum",
        location: "Rue de Rivoli",
        type: "attraction",
        description: "World's largest art museum and historic monument",
      },
      {
        time: "02:00 PM",
        title: "Lunch at Angelina",
        location: "226 Rue de Rivoli",
        type: "food",
        description: "Famous for hot chocolate and pastries",
      },
      {
        time: "04:00 PM",
        title: "Explore Montmartre",
        location: "Montmartre",
        type: "attraction",
        description: "Historic district with Sacré-Cœur Basilica",
      },
      {
        time: "08:00 PM",
        title: "Dinner at Le Petit Cambodge",
        location: "20 Rue Alibert",
        type: "food",
        description: "Popular spot for Cambodian cuisine",
      },
    ],
  },
];

const ActivityIcon = ({ type }: { type: Activity["type"] }) => {
  switch (type) {
    case "food":
      return <Utensils className="h-4 w-4 text-[#FF9800]" />;
    case "attraction":
      return <MapPin className="h-4 w-4 text-[#FF5722]" />;
    case "transport":
      return <Plane className="h-4 w-4 text-[#FF5722]" />;
    case "accommodation":
      return <Bed className="h-4 w-4 text-[#2196F3]" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />;
  }
};

interface ItineraryDisplayProps {
  onActivitySelect?: (activity: Activity) => void;
}

const ItineraryDisplay = ({ onActivitySelect }: ItineraryDisplayProps = {}) => {
  return (
    <Card className="w-full bg-white border border-[#FFECB3] rounded-xl shadow-md">
      <CardHeader className="border-b border-[#FFECB3]">
        <CardTitle className="text-[#4CAF50]">Your Itinerary</CardTitle>
        <CardDescription>Paris, France - 5 days trip</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="day1" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4 bg-[#FFECB3]/30">
            <TabsTrigger
              value="day1"
              className="data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white"
            >
              Day 1
            </TabsTrigger>
            <TabsTrigger
              value="day2"
              className="data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white"
            >
              Day 2
            </TabsTrigger>
            <TabsTrigger
              value="day3"
              className="data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white"
            >
              Day 3
            </TabsTrigger>
            <TabsTrigger
              value="day4"
              className="data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white"
            >
              Day 4
            </TabsTrigger>
            <TabsTrigger
              value="day5"
              className="data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white"
            >
              Day 5
            </TabsTrigger>
          </TabsList>

          {mockItinerary.map((day, dayIndex) => (
            <TabsContent
              key={dayIndex}
              value={`day${dayIndex + 1}`}
              className="space-y-4"
            >
              <h3 className="text-lg font-medium text-[#333]">{day.date}</h3>

              <div className="space-y-3">
                {day.activities.map((activity, actIndex) => (
                  <div
                    key={actIndex}
                    className="flex items-start p-3 rounded-md border border-[#FFECB3] bg-white hover:bg-[#FFECB3]/10 transition-colors cursor-pointer"
                    onClick={() =>
                      onActivitySelect && onActivitySelect(activity)
                    }
                  >
                    <div className="mr-3 mt-0.5">
                      <ActivityIcon type={activity.type} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-[#333]">
                          {activity.title}
                        </h4>
                        <span className="text-sm text-[#FF9800] font-medium">
                          {activity.time}
                        </span>
                      </div>
                      <p className="text-sm text-[#666] flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-[#4CAF50]" />{" "}
                        {activity.location}
                      </p>
                      {activity.description && (
                        <p className="text-sm mt-1 text-[#666]">
                          {activity.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}

          {/* Empty states for other days */}
          {[3, 4, 5].map((day) => (
            <TabsContent key={day} value={`day${day}`}>
              <div className="py-8 text-center bg-[#FFECB3]/10 rounded-lg border border-dashed border-[#FFECB3]">
                <p className="text-[#666]">
                  Itinerary for Day {day} will be generated soon.
                </p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ItineraryDisplay;

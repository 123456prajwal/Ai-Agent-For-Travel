"use client";

import React, { useState } from "react";
import PreferenceForm from "@/components/trip-planner/PreferenceForm";
import ItineraryDisplay from "@/components/trip-planner/ItineraryDisplay";
import MapView from "@/components/trip-planner/MapView";
import VoiceAssistant from "@/components/trip-planner/VoiceAssistant";
import AITravelAgent from "@/components/trip-planner/AITravelAgent";
import RecommendationEngine from "@/components/trip-planner/RecommendationEngine";
import TravelInsights from "@/components/trip-planner/TravelInsights";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  Map,
  Calendar,
  Lightbulb,
  BarChart,
} from "lucide-react";

interface Activity {
  time: string;
  title: string;
  location: string;
  type: "food" | "attraction" | "transport" | "accommodation";
  description?: string;
}

type TravelPreferences = {
  destination?: string;
  dates?: Date;
  budget?: string;
  interests?: string[];
  travelers?: number;
};

export default function TripPlannerPage() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null,
  );
  const [preferences, setPreferences] = useState<TravelPreferences>({});
  const [activeTab, setActiveTab] = useState("planner");

  const handleActivitySelect = (activity: Activity) => {
    setSelectedActivity(activity);
    // In a real app, this would highlight the location on the map
    console.log("Selected activity:", activity);
  };

  const handlePreferenceUpdate = (
    newPreferences: Partial<TravelPreferences>,
  ) => {
    setPreferences((prev) => ({ ...prev, ...newPreferences }));
    console.log("Updated preferences:", { ...preferences, ...newPreferences });
  };

  const handleRecommendationSelect = (recommendation: any) => {
    console.log("Selected recommendation:", recommendation);
    // In a real app, this would update the itinerary or show details
  };

  const handleRecommendationFeedback = (id: string, isPositive: boolean) => {
    console.log(
      `Feedback for recommendation ${id}: ${isPositive ? "positive" : "negative"}`,
    );
    // In a real app, this would be sent to the backend to improve recommendations
  };

  return (
    <div className="min-h-screen bg-[#FFF8E1]">
      <header className="bg-[#FFECB3] py-4 px-6 rounded-b-3xl mb-8">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[#4CAF50] font-bold text-2xl">AI</span>
            <span className="text-[#333] font-bold text-2xl">
              Travel Planner
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#"
              className="text-[#333] font-medium hover:text-[#4CAF50] transition-colors"
            >
              Destinations
            </Link>
            <Link
              href="#"
              className="text-[#333] font-medium hover:text-[#4CAF50] transition-colors"
            >
              My Trips
            </Link>
            <Link href="/trip-planner" className="text-[#4CAF50] font-medium">
              Plan Trip
            </Link>
            <Link
              href="#"
              className="text-[#333] font-medium hover:text-[#4CAF50] transition-colors"
            >
              Sign in
            </Link>
          </nav>
          <ThemeSwitcher />
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 text-[#333]">
          AI Trip Planner
        </h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto bg-[#FFECB3]/30">
            <TabsTrigger
              value="planner"
              className="data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white flex items-center justify-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Trip Planner</span>
            </TabsTrigger>
            <TabsTrigger
              value="assistant"
              className="data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white flex items-center justify-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">AI Assistant</span>
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className="data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white flex items-center justify-center gap-2"
            >
              <Lightbulb className="h-4 w-4" />
              <span className="hidden sm:inline">Recommendations</span>
            </TabsTrigger>
            <TabsTrigger
              value="insights"
              className="data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white flex items-center justify-center gap-2"
            >
              <BarChart className="h-4 w-4" />
              <span className="hidden sm:inline">Travel Insights</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <TabsContent value="planner" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <PreferenceForm />
              <div className="mt-4 flex justify-end">
                <VoiceAssistant />
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-6">
                <MapView />
                {selectedActivity && (
                  <div className="mt-2 p-3 bg-[#FFECB3]/30 rounded-md border border-[#FFECB3]">
                    <p className="text-sm font-medium text-[#333]">
                      Selected: {selectedActivity.title}
                    </p>
                    <p className="text-xs text-[#666]">
                      {selectedActivity.location} • {selectedActivity.time}
                    </p>
                  </div>
                )}
                <ItineraryDisplay onActivitySelect={handleActivitySelect} />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="assistant" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AITravelAgent onRecommendation={handlePreferenceUpdate} />
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-md border border-[#FFECB3] mb-6">
                <h2 className="text-2xl font-semibold tracking-tight mb-4 text-[#4CAF50]">
                  Current Preferences
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-[#333]">
                      Destination
                    </p>
                    <p className="text-lg text-[#FF9800]">
                      {preferences.destination || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#333]">
                      Travel Date
                    </p>
                    <p className="text-lg text-[#FF9800]">
                      {preferences.dates
                        ? preferences.dates.toLocaleDateString()
                        : "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#333]">Budget</p>
                    <p className="text-lg text-[#FF9800]">
                      {preferences.budget || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#333]">Interests</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {preferences.interests &&
                      preferences.interests.length > 0 ? (
                        preferences.interests.map((interest, index) => (
                          <span
                            key={index}
                            className="bg-[#FFECB3] text-[#333] px-2 py-1 rounded-full text-xs"
                          >
                            {interest}
                          </span>
                        ))
                      ) : (
                        <p className="text-lg text-[#FF9800]">Not specified</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <VoiceAssistant />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="mt-0">
          <RecommendationEngine
            recommendations={[]}
            onSelect={handleRecommendationSelect}
            onFeedback={handleRecommendationFeedback}
          />
        </TabsContent>

        <TabsContent value="insights" className="mt-0">
          <TravelInsights destination={preferences.destination} />
        </TabsContent>
      </div>

      <footer className="bg-[#FFECB3] py-6 px-6 rounded-t-3xl mt-12">
        <div className="container mx-auto text-center text-sm text-[#333]">
          <p>© 2023 AI Travel Planner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

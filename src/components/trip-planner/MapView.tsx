"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the Map component to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-[300px] bg-[#E8F5E9] rounded-md overflow-hidden border border-[#FFECB3] flex items-center justify-center">
      <p className="text-[#4CAF50]">Loading map...</p>
    </div>
  ),
});

const MapView = () => {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  const handleMarkerClick = (locationName: string) => {
    setActiveLocation(locationName);
  };

  return (
    <Card className="w-full bg-white border border-[#FFECB3] rounded-xl shadow-md">
      <CardHeader className="pb-2 border-b border-[#FFECB3]">
        <CardTitle className="text-xl text-[#4CAF50]">Trip Map</CardTitle>
        {activeLocation && (
          <p className="text-sm text-[#666]">
            Selected: <span className="font-medium">{activeLocation}</span>
          </p>
        )}
      </CardHeader>
      <CardContent className="pt-4">
        <MapComponent onMarkerClick={handleMarkerClick} />

        <div className="flex justify-between mt-4 text-sm">
          <div className="flex items-center">
            <div className="h-3 w-3 bg-[#2196F3] rounded-full mr-2"></div>
            <span className="text-[#333]">Hotels</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 bg-[#FF5722] rounded-full mr-2"></div>
            <span className="text-[#333]">Attractions</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 bg-[#4CAF50] rounded-full mr-2"></div>
            <span className="text-[#333]">Restaurants</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapView;

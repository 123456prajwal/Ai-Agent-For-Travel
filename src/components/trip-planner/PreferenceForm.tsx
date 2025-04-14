"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plane, Users, DollarSign, Heart } from "lucide-react";

const PreferenceForm = () => {
  const [destination, setDestination] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [budget, setBudget] = useState("1000");
  const [interests, setInterests] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger the AI to generate an itinerary
    console.log({ destination, travelers, date, budget, interests });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-[#FFECB3]">
      <h2 className="text-2xl font-semibold tracking-tight mb-4 text-[#4CAF50]">
        Travel Preferences
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="destination" className="text-[#333]">
            Destination
          </Label>
          <div className="flex items-center space-x-2">
            <Plane className="h-4 w-4 text-[#FF9800]" />
            <Input
              id="destination"
              placeholder="Where do you want to go?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              className="border-[#FFECB3] focus:border-[#4CAF50] focus:ring-[#4CAF50]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date" className="text-[#333]">
            Travel Dates
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal border-[#FFECB3] hover:bg-[#FFECB3]/20"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-[#FF9800]" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="rounded-md border border-[#FFECB3]"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="travelers" className="text-[#333]">
            Number of Travelers
          </Label>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-[#FF9800]" />
            <Input
              id="travelers"
              type="number"
              min="1"
              value={travelers}
              onChange={(e) => setTravelers(parseInt(e.target.value))}
              required
              className="border-[#FFECB3] focus:border-[#4CAF50] focus:ring-[#4CAF50]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget" className="text-[#333]">
            Budget (USD)
          </Label>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-[#FF9800]" />
            <Input
              id="budget"
              type="number"
              min="100"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
              className="border-[#FFECB3] focus:border-[#4CAF50] focus:ring-[#4CAF50]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="interests" className="text-[#333]">
            Interests
          </Label>
          <div className="flex items-center space-x-2">
            <Heart className="h-4 w-4 text-[#FF9800]" />
            <Input
              id="interests"
              placeholder="Nature, Food, History, etc."
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="border-[#FFECB3] focus:border-[#4CAF50] focus:ring-[#4CAF50]"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#689F38] hover:bg-[#558B2F] text-white rounded-full"
        >
          Generate Itinerary
        </Button>
      </form>
    </div>
  );
};

export default PreferenceForm;

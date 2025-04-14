"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);

  const toggleListening = () => {
    setIsListening(!isListening);
    // In a real app, this would start/stop voice recognition
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={isListening ? "default" : "outline"}
            size="icon"
            className={`rounded-full h-12 w-12 ${isListening ? "bg-[#FF9800] hover:bg-[#F57C00] animate-pulse" : "border-[#FFECB3] hover:bg-[#FFECB3]/20"}`}
            onClick={toggleListening}
          >
            {isListening ? (
              <MicOff className="h-5 w-5 text-white" />
            ) : (
              <Mic className="h-5 w-5 text-[#FF9800]" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-white border border-[#FFECB3]">
          <p className="text-[#333]">
            {isListening ? "Stop voice assistant" : "Start voice assistant"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VoiceAssistant;

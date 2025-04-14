"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Send, User, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

type AITravelAgentProps = {
  onRecommendation?: (recommendation: {
    destination?: string;
    dates?: Date;
    budget?: string;
    interests?: string[];
    travelers?: number;
  }) => void;
};

const AITravelAgent = ({ onRecommendation }: AITravelAgentProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI Travel Assistant. I can help you plan your perfect trip. Just tell me where you'd like to go, when you're planning to travel, your budget, and what you enjoy doing!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample responses for demo purposes
  const sampleResponses = [
    {
      trigger: ["paris", "france"],
      response:
        "Paris is a wonderful choice! The best time to visit is spring (April to June) or fall (September to October) when the weather is pleasant. Would you like recommendations for attractions, accommodations, or local cuisine?",
      recommendation: { destination: "Paris, France" },
    },
    {
      trigger: ["budget"],
      response:
        "I understand budget is important. For Paris, I recommend allocating around €150-200 per day including accommodations, food, and attractions. Luxury options would start from €300 per day. Would you like me to suggest budget-friendly accommodations and activities?",
      recommendation: { budget: "€150-200 per day" },
    },
    {
      trigger: ["family", "kids", "children"],
      response:
        "Paris is great for families! I recommend visiting Disneyland Paris, the Natural History Museum, and taking a Seine River cruise. The Luxembourg Gardens also has a wonderful playground. Would you like me to create a family-friendly itinerary?",
      recommendation: { interests: ["Family activities", "Kid-friendly"] },
    },
    {
      trigger: ["food", "eat", "restaurant", "cuisine"],
      response:
        "French cuisine is world-renowned! In Paris, you must try authentic croissants, baguettes, and cheese. For restaurants, I recommend visiting local bistros in Le Marais or Latin Quarter for an authentic experience. Would you like specific restaurant recommendations?",
      recommendation: { interests: ["Food & Dining", "Local Cuisine"] },
    },
    {
      trigger: ["hotel", "stay", "accommodation"],
      response:
        "Paris offers a range of accommodations. For a central location, consider staying in Le Marais, Saint-Germain-des-Prés, or Montmartre. Budget hotels start around €80 per night, while mid-range options are €150-250. Would you like specific hotel recommendations based on your preferences?",
    },
    {
      trigger: ["itinerary", "plan", "schedule"],
      response:
        "I'd be happy to create a personalized itinerary for you! A typical 3-day Paris itinerary might include: Day 1: Eiffel Tower, Seine River cruise, and Champs-Élysées. Day 2: Louvre Museum, Notre-Dame Cathedral, and Le Marais. Day 3: Montmartre, Sacré-Cœur, and local shopping. Would you like me to customize this based on your interests?",
    },
  ];

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      // Check for matches in sample responses
      const inputLower = input.toLowerCase();
      let matched = false;

      for (const sample of sampleResponses) {
        if (sample.trigger.some((t) => inputLower.includes(t))) {
          const assistantMessage: Message = {
            role: "assistant",
            content: sample.response,
            timestamp: new Date(),
          };

          setMessages((prev) => [...prev, assistantMessage]);

          // If there's a recommendation and callback, send it
          if (sample.recommendation && onRecommendation) {
            onRecommendation(sample.recommendation);
          }

          matched = true;
          break;
        }
      }

      // Default response if no match
      if (!matched) {
        const defaultMessage: Message = {
          role: "assistant",
          content:
            "I understand you're interested in planning a trip. Could you provide more details about your destination, travel dates, budget, or interests? This will help me create better recommendations for you.",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, defaultMessage]);
      }

      setIsProcessing(false);
    }, 1500);
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Card className="w-full bg-white border border-[#FFECB3] rounded-xl shadow-md flex flex-col h-[500px]">
      <CardHeader className="border-b border-[#FFECB3]">
        <CardTitle className="text-[#4CAF50] flex items-center gap-2">
          <Bot className="h-5 w-5" /> AI Travel Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${message.role === "user" ? "bg-[#4CAF50] text-white" : "bg-[#FFECB3]/50 text-[#333]"}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                    <span className="text-xs font-medium">
                      {message.role === "user" ? "You" : "AI Assistant"}
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                  <div className="text-xs opacity-70 mt-1 text-right">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-[#FFECB3]/50 text-[#333] rounded-lg p-3 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-[#FFECB3] mt-auto">
          <div className="flex gap-2">
            <Input
              placeholder="Ask about destinations, activities, or travel tips..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="border-[#FFECB3] focus:border-[#4CAF50] focus:ring-[#4CAF50]"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isProcessing || !input.trim()}
              className="bg-[#689F38] hover:bg-[#558B2F] text-white rounded-full px-4"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AITravelAgent;

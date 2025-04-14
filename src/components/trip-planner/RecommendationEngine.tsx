"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ThumbsUp, ThumbsDown } from "lucide-react";

type Recommendation = {
  id: string;
  type: "destination" | "activity" | "accommodation" | "restaurant";
  title: string;
  description: string;
  rating: number;
  price: string;
  tags: string[];
  imageUrl?: string;
};

type RecommendationEngineProps = {
  recommendations: Recommendation[];
  onSelect?: (recommendation: Recommendation) => void;
  onFeedback?: (id: string, isPositive: boolean) => void;
};

const RecommendationEngine = ({
  recommendations = [],
  onSelect,
  onFeedback,
}: RecommendationEngineProps) => {
  // If no recommendations provided, use sample data
  const displayRecommendations =
    recommendations.length > 0
      ? recommendations
      : [
          {
            id: "1",
            type: "destination",
            title: "Paris, France",
            description:
              "The City of Light offers iconic landmarks, world-class museums, and exquisite cuisine. Perfect for romantic getaways and cultural exploration.",
            rating: 4.8,
            price: "€€€",
            tags: ["Romantic", "Cultural", "Historic"],
            imageUrl:
              "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
          },
          {
            id: "2",
            type: "activity",
            title: "Louvre Museum Tour",
            description:
              "Skip-the-line guided tour of the world's most visited museum, home to thousands of works including the Mona Lisa.",
            rating: 4.7,
            price: "€€",
            tags: ["Art", "History", "Indoor"],
            imageUrl:
              "https://images.unsplash.com/photo-1565784622140-aa33e4597329?w=800&q=80",
          },
          {
            id: "3",
            type: "accommodation",
            title: "Hôtel Particulier Montmartre",
            description:
              "Luxurious boutique hotel in the artistic Montmartre district with garden views and exceptional service.",
            rating: 4.6,
            price: "€€€€",
            tags: ["Luxury", "Boutique", "Central"],
            imageUrl:
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
          },
          {
            id: "4",
            type: "restaurant",
            title: "Le Comptoir du Relais",
            description:
              "Classic French bistro offering seasonal dishes in a charming Saint-Germain setting. Reservations recommended.",
            rating: 4.5,
            price: "€€€",
            tags: ["French Cuisine", "Bistro", "Local Favorite"],
            imageUrl:
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
          },
        ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "destination":
        return "bg-[#FF9800] text-white";
      case "activity":
        return "bg-[#4CAF50] text-white";
      case "accommodation":
        return "bg-[#2196F3] text-white";
      case "restaurant":
        return "bg-[#F44336] text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const handleSelect = (recommendation: Recommendation) => {
    if (onSelect) {
      onSelect(recommendation);
    }
  };

  const handleFeedback = (id: string, isPositive: boolean) => {
    if (onFeedback) {
      onFeedback(id, isPositive);
    }
  };

  return (
    <Card className="w-full bg-white border border-[#FFECB3] rounded-xl shadow-md">
      <CardHeader className="border-b border-[#FFECB3]">
        <CardTitle className="text-[#4CAF50] flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#FF9800]" /> AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayRecommendations.map((recommendation) => (
            <div
              key={recommendation.id}
              className="border border-[#FFECB3] rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleSelect(recommendation)}
            >
              {recommendation.imageUrl && (
                <div className="h-40 overflow-hidden">
                  <img
                    src={recommendation.imageUrl}
                    alt={recommendation.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-[#333]">
                    {recommendation.title}
                  </h3>
                  <Badge
                    className={`${getTypeColor(recommendation.type)} text-xs`}
                  >
                    {recommendation.type.charAt(0).toUpperCase() +
                      recommendation.type.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-[#666] mb-3">
                  {recommendation.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="text-[#FF9800] font-medium">
                      {recommendation.rating}
                    </span>
                    <span className="text-xs text-[#666]">/ 5.0</span>
                    <span className="ml-2 text-sm text-[#666]">
                      {recommendation.price}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeedback(recommendation.id, true);
                      }}
                      className="p-1 hover:bg-[#E8F5E9] rounded-full"
                      aria-label="Like"
                    >
                      <ThumbsUp className="h-4 w-4 text-[#4CAF50]" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeedback(recommendation.id, false);
                      }}
                      className="p-1 hover:bg-[#FFEBEE] rounded-full"
                      aria-label="Dislike"
                    >
                      <ThumbsDown className="h-4 w-4 text-[#F44336]" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {recommendation.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs bg-[#FFECB3]/30 border-[#FFECB3] text-[#333]"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationEngine;

"use client";

import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet with Next.js
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom icons for different location types
const hotelIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  className: "hotel-marker", // Apply blue color via CSS
});

const attractionIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  className: "attraction-marker", // Apply orange color via CSS
});

const restaurantIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  className: "restaurant-marker", // Apply green color via CSS
});

interface Location {
  id: number;
  name: string;
  position: [number, number];
  type: "hotel" | "attraction" | "restaurant";
  description?: string;
}

interface MapComponentProps {
  onMarkerClick?: (locationName: string) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onMarkerClick }) => {
  // Sample data for Paris trip
  const locations: Location[] = [
    {
      id: 1,
      name: "Hotel de Paris",
      position: [48.873, 2.295],
      type: "hotel",
      description: "4-star hotel in central Paris",
    },
    {
      id: 2,
      name: "Eiffel Tower",
      position: [48.858, 2.294],
      type: "attraction",
      description: "Iconic landmark with panoramic views of Paris",
    },
    {
      id: 3,
      name: "Louvre Museum",
      position: [48.861, 2.335],
      type: "attraction",
      description: "World's largest art museum and historic monument",
    },
    {
      id: 4,
      name: "Café de Flore",
      position: [48.854, 2.333],
      type: "restaurant",
      description: "Historic café with classic French cuisine",
    },
    {
      id: 5,
      name: "Le Comptoir",
      position: [48.851, 2.338],
      type: "restaurant",
      description: "Renowned bistro with seasonal French dishes",
    },
  ];

  // Route line connecting the locations in order
  const routePositions = locations.map((loc) => loc.position);

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case "hotel":
        return hotelIcon;
      case "attraction":
        return attractionIcon;
      case "restaurant":
        return restaurantIcon;
      default:
        return DefaultIcon;
    }
  };

  const handleMarkerClick = (locationName: string) => {
    if (onMarkerClick) {
      onMarkerClick(locationName);
    }
  };

  return (
    <div className="relative w-full h-[300px] rounded-md overflow-hidden border border-[#FFECB3]">
      <style jsx global>{`
        .hotel-marker {
          filter: hue-rotate(0deg) brightness(1);
        }
        .attraction-marker {
          filter: hue-rotate(30deg) brightness(1.2);
        }
        .restaurant-marker {
          filter: hue-rotate(120deg) brightness(1);
        }
      `}</style>
      <MapContainer
        center={[48.864, 2.315]} // Paris center
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {locations.map((location) => (
          <Marker
            key={location.id}
            position={location.position}
            icon={getMarkerIcon(location.type)}
            eventHandlers={{
              click: () => handleMarkerClick(location.name),
            }}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{location.name}</h3>
                {location.description && <p>{location.description}</p>}
                <p className="text-xs mt-1">
                  Type:{" "}
                  {location.type.charAt(0).toUpperCase() +
                    location.type.slice(1)}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        <Polyline
          positions={routePositions}
          pathOptions={{ color: "#FF9800", weight: 3, dashArray: "5, 5" }}
        />
      </MapContainer>
    </div>
  );
};

export default MapComponent;

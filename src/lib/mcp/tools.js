/**
 * MCP Travel-Specific Tools
 *
 * This file contains tool implementations for travel-related functionality
 * that can be registered with the MCP server.
 */

const { registerTool } = require("./server");

// Mock APIs for demonstration purposes
const mockFlightAPI = {
  search: async ({ origin, destination, date }) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return mock flight data
    return [
      {
        id: "fl-1",
        airline: "SkyHigh Airways",
        flightNumber: "SH101",
        origin,
        destination,
        departureTime: "08:00",
        arrivalTime: "10:30",
        duration: "2h 30m",
        price: 299.99,
        seatsAvailable: 12,
      },
      {
        id: "fl-2",
        airline: "Global Air",
        flightNumber: "GA205",
        origin,
        destination,
        departureTime: "12:15",
        arrivalTime: "14:45",
        duration: "2h 30m",
        price: 349.99,
        seatsAvailable: 8,
      },
      {
        id: "fl-3",
        airline: "Coastal Jets",
        flightNumber: "CJ512",
        origin,
        destination,
        departureTime: "16:30",
        arrivalTime: "19:00",
        duration: "2h 30m",
        price: 279.99,
        seatsAvailable: 5,
      },
    ];
  },
  book: async ({ flightId, passenger }) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return mock booking confirmation
    return {
      bookingId: `bk-${Date.now()}`,
      flightId,
      passenger,
      status: "confirmed",
      confirmationCode: `CF${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
      timestamp: new Date().toISOString(),
    };
  },
};

const mockHotelAPI = {
  search: async ({ location, checkIn, checkOut, guests }) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 700));

    // Return mock hotel data
    return [
      {
        id: "ht-1",
        name: "Grand Plaza Hotel",
        location,
        address: "123 Main Street",
        rating: 4.5,
        price: 199.99,
        amenities: ["wifi", "pool", "spa", "restaurant"],
        roomsAvailable: 3,
      },
      {
        id: "ht-2",
        name: "Seaside Resort",
        location,
        address: "456 Beach Road",
        rating: 4.8,
        price: 299.99,
        amenities: ["wifi", "pool", "beach access", "restaurant", "gym"],
        roomsAvailable: 2,
      },
      {
        id: "ht-3",
        name: "City Center Inn",
        location,
        address: "789 Downtown Avenue",
        rating: 4.0,
        price: 149.99,
        amenities: ["wifi", "restaurant", "business center"],
        roomsAvailable: 5,
      },
    ];
  },
  book: async ({ hotelId, guests, checkIn, checkOut }) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return mock booking confirmation
    return {
      bookingId: `hb-${Date.now()}`,
      hotelId,
      guests,
      checkIn,
      checkOut,
      status: "confirmed",
      confirmationCode: `HB${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
      timestamp: new Date().toISOString(),
    };
  },
};

// Register travel-specific tools
function registerTravelTools() {
  // Flight search tool
  registerTool(
    "searchFlights",
    async (parameters) => {
      const { origin, destination, date, passengers, budget } = parameters;

      // Validate required parameters
      if (!origin || !destination || !date) {
        throw new Error(
          "Missing required parameters: origin, destination, date",
        );
      }

      // Search for flights
      const flights = await mockFlightAPI.search({ origin, destination, date });

      // Filter by budget if provided
      let filteredFlights = flights;
      if (budget) {
        filteredFlights = flights.filter((flight) => flight.price <= budget);
      }

      return {
        flights: filteredFlights,
        count: filteredFlights.length,
        lowestPrice: Math.min(...filteredFlights.map((f) => f.price)),
      };
    },
    ["travel:read"],
  );

  // Flight booking tool
  registerTool(
    "bookFlight",
    async (parameters) => {
      const { flightId, passenger } = parameters;

      // Validate required parameters
      if (!flightId || !passenger) {
        throw new Error("Missing required parameters: flightId, passenger");
      }

      // Book the flight
      const booking = await mockFlightAPI.book({ flightId, passenger });

      return booking;
    },
    ["travel:write", "payment:execute"],
  );

  // Hotel search tool
  registerTool(
    "searchHotels",
    async (parameters) => {
      const { location, checkIn, checkOut, guests, amenities, budget } =
        parameters;

      // Validate required parameters
      if (!location || !checkIn || !checkOut || !guests) {
        throw new Error(
          "Missing required parameters: location, checkIn, checkOut, guests",
        );
      }

      // Search for hotels
      const hotels = await mockHotelAPI.search({
        location,
        checkIn,
        checkOut,
        guests,
      });

      // Filter by budget if provided
      let filteredHotels = hotels;
      if (budget) {
        filteredHotels = hotels.filter((hotel) => hotel.price <= budget);
      }

      // Filter by amenities if provided
      if (amenities && amenities.length > 0) {
        filteredHotels = filteredHotels.filter((hotel) =>
          amenities.every((amenity) => hotel.amenities.includes(amenity)),
        );
      }

      return {
        hotels: filteredHotels,
        count: filteredHotels.length,
        lowestPrice: Math.min(...filteredHotels.map((h) => h.price)),
      };
    },
    ["travel:read"],
  );

  // Hotel booking tool
  registerTool(
    "bookHotel",
    async (parameters) => {
      const { hotelId, guests, checkIn, checkOut } = parameters;

      // Validate required parameters
      if (!hotelId || !guests || !checkIn || !checkOut) {
        throw new Error(
          "Missing required parameters: hotelId, guests, checkIn, checkOut",
        );
      }

      // Book the hotel
      const booking = await mockHotelAPI.book({
        hotelId,
        guests,
        checkIn,
        checkOut,
      });

      return booking;
    },
    ["travel:write", "payment:execute"],
  );

  // Itinerary planning tool
  registerTool(
    "createItinerary",
    async (parameters) => {
      const { destination, duration, interests, pace, budget } = parameters;

      // Validate required parameters
      if (!destination || !duration) {
        throw new Error("Missing required parameters: destination, duration");
      }

      // Simulate AI-based itinerary creation
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate a mock itinerary
      const days = [];
      for (let i = 1; i <= duration; i++) {
        days.push({
          day: i,
          date: new Date(Date.now() + (i - 1) * 86400000)
            .toISOString()
            .split("T")[0],
          activities: generateActivities(
            destination,
            interests,
            3 + Math.floor(Math.random() * 3),
          ),
        });
      }

      return {
        destination,
        duration,
        days,
        estimatedCost: calculateEstimatedCost(days, budget),
      };
    },
    ["travel:read"],
  );

  console.log("Travel tools registered successfully");
}

// Helper function to generate mock activities
function generateActivities(destination, interests = [], count = 3) {
  const activityTypes = ["attraction", "food", "transport", "accommodation"];
  const activities = [];

  for (let i = 0; i < count; i++) {
    const type =
      activityTypes[Math.floor(Math.random() * activityTypes.length)];

    activities.push({
      id: `act-${Date.now()}-${i}`,
      time: `${9 + i * 3}:00`,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} in ${destination}`,
      location: `${destination} ${type} location`,
      type,
      description: `Enjoy this ${type} in ${destination}`,
      price: 50 + Math.floor(Math.random() * 150),
    });
  }

  return activities;
}

// Helper function to calculate estimated cost
function calculateEstimatedCost(days, budget) {
  let totalCost = 0;

  days.forEach((day) => {
    day.activities.forEach((activity) => {
      totalCost += activity.price || 0;
    });
  });

  return {
    total: totalCost,
    perDay: Math.round(totalCost / days.length),
    withinBudget: !budget || totalCost <= budget,
  };
}

module.exports = {
  registerTravelTools,
};

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Search } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFF8E1]">
      <header className="bg-[#FFECB3] py-4 px-6 rounded-b-3xl">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-[#4CAF50] font-bold text-2xl">AI</span>
            <span className="text-[#333] font-bold text-2xl">
              Travel Planner
            </span>
          </div>
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
            <Link
              href="/trip-planner"
              className="text-[#333] font-medium hover:text-[#4CAF50] transition-colors"
            >
              Plan Trip
            </Link>
            <Link
              href="#"
              className="text-[#333] font-medium hover:text-[#4CAF50] transition-colors"
            >
              Sign in
            </Link>
          </nav>
          <div className="md:hidden">
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 px-6 bg-[#FFECB3] relative overflow-hidden">
          <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div className="z-10">
              <h1 className="text-5xl font-bold mb-4">
                <span className="text-[#333]">ENJOY</span>
                <br />
                <span className="text-[#FF6D00]">WONDERFUL</span>
                <span className="text-[#333]"> FEELING</span>
              </h1>
              <p className="text-[#333] mb-8 max-w-md">
                At AI Travel Planner, we promise our guests with the standard of
                excellence and hospitality that is just for the customer's
                enjoyment and budget.
              </p>

              <div className="bg-white p-6 rounded-xl shadow-md max-w-md">
                <h3 className="text-[#4CAF50] text-2xl font-bold mb-4">
                  Book Now
                </h3>
                <div className="flex flex-col sm:flex-row gap-2 mb-4">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Where to?"
                      className="bg-white border-gray-300 pl-4 pr-10 py-2 rounded-full"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Date"
                      className="bg-white border-gray-300 pl-4 pr-10 py-2 rounded-full"
                    />
                    <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </div>
                <Link href="/trip-planner">
                  <Button className="w-full sm:w-auto bg-[#689F38] hover:bg-[#558B2F] text-white rounded-full px-8 py-2">
                    <Search className="mr-2 h-4 w-4" /> Search
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative hidden md:block">
              <Image
                src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&q=80"
                alt="Traveler"
                width={500}
                height={600}
                className="rounded-xl object-cover"
              />
            </div>
          </div>

          {/* Decorative waves */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-[#FFF8E1] rounded-t-[50%] -mb-12"></div>
        </section>

        {/* Popular Destinations */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-[#333] mb-8">
              Popular Destination
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="rounded-xl overflow-hidden relative group">
                <Image
                  src="https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=800&q=80"
                  alt="Eiffel Tower"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="bg-[#FF6D00] text-white px-4 py-2 rounded-full inline-block">
                    Historical Places
                  </div>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden relative group">
                <Image
                  src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80"
                  alt="Paris"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="bg-[#FF9800] text-white px-4 py-2 rounded-full inline-block">
                    Famous Canal
                  </div>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden relative group">
                <Image
                  src="https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=800&q=80"
                  alt="Desert"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="bg-[#FF5722] text-white px-4 py-2 rounded-full inline-block">
                    Desert Adventures
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Travels */}
        <section className="py-16 px-6 bg-[#FFF8E1]">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#333] mb-6">
                  Our Travels
                </h2>
                <div className="flex gap-4 mb-6 overflow-x-auto pb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&q=80"
                    alt="Hiking"
                    width={200}
                    height={150}
                    className="rounded-lg object-cover h-32 w-32"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
                    alt="Guide"
                    width={200}
                    height={150}
                    className="rounded-lg object-cover h-32 w-32"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&q=80"
                    alt="Beach"
                    width={200}
                    height={150}
                    className="rounded-lg object-cover h-32 w-32"
                  />
                </div>
                <p className="text-[#333]">
                  At AI Travel Planner, we promise our guests with the standard
                  of excellence and hospitality that ensures memorable
                  experiences.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FFECB3] rounded-full z-0"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#4CAF50]/20 rounded-full z-0"></div>
                <div className="relative z-10 bg-white p-8 rounded-xl shadow-md">
                  <h2 className="text-3xl font-bold text-[#333] mb-6">
                    About Us
                  </h2>
                  <p className="text-[#333] mb-6">
                    At AI Travel Planner, we promise our guests with the
                    standard of excellence and personalized travel experiences
                    that fit your preferences and budget.
                  </p>
                  <div className="flex justify-center">
                    <Image
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80"
                      alt="Travel Agent"
                      width={200}
                      height={200}
                      className="rounded-full object-cover h-32 w-32 border-4 border-[#FFECB3]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#FFECB3] py-8 px-6 rounded-t-3xl">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex gap-6 mb-4 md:mb-0">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-[#FFF8E1] rounded-full flex items-center justify-center mb-1">
                  <span className="text-[#333]">🌐</span>
                </div>
                <span className="text-xs text-[#333]">Globe.net</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-[#FFF8E1] rounded-full flex items-center justify-center mb-1">
                  <span className="text-[#333]">🍴</span>
                </div>
                <span className="text-xs text-[#333]">Chamase</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-[#FFF8E1] rounded-full flex items-center justify-center mb-1">
                  <span className="text-[#333]">🌿</span>
                </div>
                <span className="text-xs text-[#333]">Pam Tine</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                href="/trip-planner"
                className="w-10 h-10 bg-[#FF9800] rounded-full flex items-center justify-center text-white"
              >
                📞
              </Link>
              <Link
                href="/trip-planner"
                className="w-10 h-10 bg-[#FF9800] rounded-full flex items-center justify-center text-white"
              >
                🌟
              </Link>
              <Link
                href="/trip-planner"
                className="w-10 h-10 bg-[#FF9800] rounded-full flex items-center justify-center text-white"
              >
                ✈️
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

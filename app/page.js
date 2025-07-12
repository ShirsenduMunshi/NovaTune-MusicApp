"use client";
import HeroSection from "@/components/Hero_Search_Compo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaAnglesRight } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import TrendingSongs from "@/components/TrendingSongs";
import PopularArtists from "@/components/PopularArtists";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full bg-background text-foreground">

      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden px-4 pt-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-fit p-2">
              <FaAnglesRight />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[90%] p-4">
            <h2 className="text-lg font-semibold mb-3">Suggested Music</h2>
            <p className="text-sm text-muted-foreground">
              No data available yet.
            </p>
          </SheetContent>
        </Sheet>
      </div>

      {/* Layout Wrapper */}
      <div className="flex flex-1 w-full max-w-7xl mx-auto px-4 py-6 gap-4">

        {/* Desktop Sidebar */}
        <aside className="w-[25%] rounded-xl border border-border p-4 hidden md:block">
          <h2 className="text-lg font-semibold mb-3">Suggested Music</h2>
          No data available yet.
        </aside>

        {/* Main Content */}
        <section className="md:w-[85%] w-full rounded-xl">
          <HeroSection />
          <Separator />
          <TrendingSongs />
          <Separator />
          <PopularArtists />
        </section>
      </div>

      {/* Music Player */}
      <div className="sticky bottom-0 left-0 w-full bg-background border-t border-border p-4 flex justify-center z-50">
        <MusicPlayer
          song={{
            title: "Test Track",
            artist: "Test Artist",
            src: "/dummy-audio.mp3", // Place this file in /public folder
            cover: "/cover.jpg", // Place this image in /public/images
          }}
        />
      </div>
    </main>
  );
}

"use client";
import HeroSection from "@/components/Hero_Search_Compo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaAnglesRight } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import TrendingSongs from "@/components/TrendingSongs";
import PopularArtists from "@/components/PopularArtists";
import SuggestedSongs from "@/components/SuggestedSongs";
import DynamicMusicSlider from "@/components/DynamicMusicSlider";

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
            <SuggestedSongs />
          </SheetContent>
        </Sheet>
      </div>

      {/* Layout Wrapper */}
      <div className="flex flex-1 w-full max-w-7xl mx-auto px-4 py-6 gap-4">

        {/* Desktop Sidebar */}
        <aside className="w-[25%] rounded-xl border border-border p-4 hidden md:block">
          <h2 className="text-lg font-semibold mb-3">Suggested Music</h2>
          <SuggestedSongs />
        </aside>

        {/* Main Content */}
        <section className="md:w-[85%] w-full rounded-xl">
          <HeroSection />
          <Separator />
          <TrendingSongs />
          <Separator />
          <PopularArtists />
          <Separator />
          <DynamicMusicSlider title="🎬 Bollywood Hits" query="bollywood top hits"/>
          <Separator />
          <DynamicMusicSlider
          title="💔 Heart Broke Collection"
          query="arijit singh sad songs"
        />
          <Separator />
           <DynamicMusicSlider
          title="🎞 60's Bollywood Classics"
          query="60s bollywood hits"
        />
          <Separator />
          <DynamicMusicSlider
          title="🎥 90's Bollywood Nostalgia"
          query="90s bollywood hit songs"
        />
          <Separator />
          <DynamicMusicSlider
          title="💖 Ever Green English Romantic"
          query="evergreen english romantic songs"
        />
          <Separator />
        </section>
      </div>
    </main>
  );
}

import React, { useEffect } from "react";
import { HeroSection } from "./components/HeroSection";
import { NavigationTabs } from "./components/NavigationTabs";
import { MainHighlight } from "./components/MainHighlight";
import { FeaturedHighlights } from "./components/FeaturedHighlights";
import { SeasonStats } from "./components/SeasonStats";
import { TopPlayCategories } from "./components/TopPlayCategories";
import { SubscribeSection } from "./components/SubscribeSection";

export default function Highlights() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-kh-dark min-h-screen text-foreground flex flex-col w-full">
      <HeroSection />
      <NavigationTabs />

      {/* Highlights Grid */}
      <section className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video (Left 2/3) */}
          <div className="lg:col-span-2">
            <MainHighlight />
          </div>

          {/* Featured List (Right 1/3) */}
          <div className="lg:col-span-1">
            <FeaturedHighlights />
          </div>
        </div>
      </section>

      <SeasonStats />
      <TopPlayCategories />
      <SubscribeSection />
    </main>
  );
}

import { useState } from "react";
import { Outlet } from "react-router";
import { AnimatePresence } from "motion/react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Preloader from "@/components/common/Preloader";

export default function MainLayout() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <>
      {/* 1. Cinematic Entry Screen Overlay Handler */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* 2. Primary Core Application Frame */}
      <div
        className={`min-h-screen flex flex-col transition-opacity duration-500 ${
          isLoading ? "h-screen overflow-hidden opacity-0" : "opacity-100"
        }`}
      >
        <Navbar />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}

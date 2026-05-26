import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

declare global {
  interface Window {
    lenis: Lenis | null;
  }
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with premium feel configuration
    const lenis = new Lenis({
      duration: 1.2, // Speed of the smooth scroll animation (in seconds)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Clean kinetic easing curve
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1, // Adjust scroll responsiveness sensitivity
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    // Connect Lenis to the browser's global render frame loop
    function raf(time: number) {
      lenis.raf(time); // Syncs internal frame positioning state
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Clean up on component unmount
    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return <>{children}</>;
}

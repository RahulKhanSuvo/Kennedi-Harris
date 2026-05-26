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
    const lenis = new Lenis({
      // We use lerp (Linear Interpolation) instead of duration for an ultra-smooth, physics-based inertial glide.
      // 0.07 is the premium sweet spot: lower is smoother and more fluid, higher is more responsive.
      lerp: 0.07,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9, // Slightly gentler scrolling steps for an elegant feel
      touchMultiplier: 1.5,
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

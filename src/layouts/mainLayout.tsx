import { Outlet, useLocation, useNavigationType } from "react-router";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

import Preloader from "@/components/common/Preloader";
import { useEffect, useRef } from "react";
import type Lenis from "@studio-freight/lenis";
import { useHome } from "@/hooks/useHome";

declare global {
  interface Window {
    lenis: Lenis | null;
  }
}

function LenisScrollRestoration() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const currentKeyRef = useRef(location.key || location.pathname);

  // Keep track of the active route's history key or pathname
  useEffect(() => {
    currentKeyRef.current = location.key || location.pathname;
  }, [location]);

  useEffect(() => {
    const lenis = window.lenis;
    if (!lenis) return;

    // Continuously save the current scroll position of the active page in sessionStorage
    const handleScroll = () => {
      const scrollY = window.scrollY;
      sessionStorage.setItem(
        `lenis_scroll_${currentKeyRef.current}`,
        scrollY.toString(),
      );
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, []);

  // Handle route change scroll actions
  useEffect(() => {
    const lenis = window.lenis;
    if (!lenis) return;

    const key = location.key || location.pathname;

    if (navigationType === "PUSH") {
      // New navigation: scroll to top immediately without transition delay
      lenis.scrollTo(0, { immediate: true });
    } else if (navigationType === "POP") {
      // Back/forward navigation: restore previous scroll position
      const saved = sessionStorage.getItem(`lenis_scroll_${key}`);
      if (saved) {
        const parsed = parseInt(saved, 10);
        // Wait two frame loops to ensure the DOM elements render before restoring position
        let rafId2: number;

        const rafId1 = requestAnimationFrame(() => {
          rafId2 = requestAnimationFrame(() => {
            lenis.scrollTo(parsed, { immediate: true });
          });
        });

        return () => {
          cancelAnimationFrame(rafId1);
          if (rafId2) cancelAnimationFrame(rafId2);
        };
      } else {
        lenis.scrollTo(0, { immediate: true });
      }
    }
  }, [location.pathname, location.key, navigationType]);

  return null;
}

export default function MainLayout() {
  const { isLoading } = useHome();

  if (isLoading) return <Preloader />;

  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />

      <LenisScrollRestoration />
    </>
  );
}
